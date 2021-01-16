/* eslint-disable @typescript-eslint/ban-ts-comment */
import { JSDOM } from 'jsdom';
import { parse } from 'acorn';
import { generate } from 'astring';
import vm from 'vm';
import {
    isArrayExpression,
    isFunctionDeclaration,
    isIdentifier,
    isNotFalsy,
    isVariableDeclaration
} from './utils/acorn';
import { DepartmentLocationData } from './types';

type ArrayElement = [string, number, number, number];

const url = 'https://www.lfv-bayern.de/ueber-uns/standorte/';

const extractLocationFromArrayElement = ([
    html,
    lat,
    long
]: ArrayElement): DepartmentLocationData => {
    const data: DepartmentLocationData = {
        name: undefined,
        federation: undefined,
        adress: {
            street: undefined,
            streetNumber: undefined,
            postalCode: undefined,
            city: undefined
        },
        phone: undefined,
        email: undefined,
        homepage: undefined,
        cords: {
            lat,
            long
        }
    };

    const fragment = JSDOM.fragment(html);

    const pElement = fragment.querySelector('p');
    const aElements = fragment.querySelectorAll('a');
    const h5Element = fragment.querySelector('h5');

    data.name = h5Element?.innerHTML;

    pElement?.childNodes?.forEach(child => {
        const text = child.textContent?.trim();
        if (!text) {
            return;
        }
        if (text.startsWith('Tel.:')) {
            data.phone = text;
        } else if (text.includes('@')) {
            data.email = text;
        } else if (
            text.startsWith('www.') ||
            text.includes('.de') ||
            text.match(/\w\.\w/)
        ) {
            data.homepage = text;
        } else if (text.match(/^\d/)) {
            const [postalCode, ...city] = text.split(' ');
            data.adress.postalCode = postalCode;
            data.adress.city = city?.join(' ');
        } else if (text.match(/\d$|\d\D$/)) {
            const street = text.split(' ');
            const streetNumber = street.pop();
            data.adress.street = street?.join(' ');
            data.adress.streetNumber = streetNumber;
        } else {
            data.federation = text;
        }
    });

    aElements?.forEach(element => {
        const href = element.getAttribute('href');
        if (!href) {
            return;
        }
        if (href.startsWith('mailto:')) {
            data.email = data.email ?? href.replace('mailto:', '');
        } else if (
            href.startsWith('http') &&
            !href.includes('www.google.com/maps')
        ) {
            data.homepage = data.homepage ?? href;
        }
    });

    return data;
};

const extractLocationsFromMapScript = (
    mapScript: string
): Array<DepartmentLocationData> | undefined =>
    parse(mapScript, { ecmaVersion: 2020 })
        .body.filter(isFunctionDeclaration)
        .find(({ id }) => id?.name === 'initMap')
        ?.body.body.filter(isVariableDeclaration)
        .flatMap(node => node.declarations)
        .filter(({ id }) => isIdentifier(id) && id?.name === 'locations')
        .map(declaration => declaration?.init)
        .find(isArrayExpression)
        ?.elements.filter(isArrayExpression)
        // @ts-ignore
        .map(node => generate(node))
        .map(node => {
            const context: {
                line: ArrayElement | null;
            } = {
                line: null
            };
            const script = new vm.Script(`line = ${node}`);
            vm.createContext(context);
            script.runInContext(context);
            return context.line;
        })
        .filter(isNotFalsy)
        .map(extractLocationFromArrayElement);

const extractMapScriptFromHtml = async (
    lfvUrl: string
): Promise<string | undefined> => {
    const dom = await JSDOM.fromURL(lfvUrl);
    const mapScript = dom.window.document
        .querySelector('#locationResult')
        ?.querySelector('script')?.innerHTML;
    dom.window.close();
    return mapScript;
};

export const collectLfvLocationsData = async (): Promise<
    Array<DepartmentLocationData> | undefined
> => {
    const mapScript = await extractMapScriptFromHtml(url);
    return mapScript ? extractLocationsFromMapScript(mapScript) : undefined;
};
