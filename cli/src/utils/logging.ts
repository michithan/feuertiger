import chalk from 'chalk';
import { ExtendedPackageInfo } from './extendedList';

const { log } = console;
const { red, yellow, grey } = chalk;

export const feuertiger = `${red('feuer')}${yellow('t')}${grey('i')}${yellow(
    'g'
)}${grey('e')}${yellow('r')}`;

export const tiger = (input: string): void => log(`${feuertiger} - ${input}`);

export const addPackagePrefix = (
    text: string,
    { prefix }: ExtendedPackageInfo
): string =>
    `${prefix}${text.trimRight().replace(/\r?\n|\r/gi, `\r\n${prefix}`)}\r\n`;

export const addErrorPackagePrefix = (
    text: string,
    { prefix }: ExtendedPackageInfo
): string => {
    const errorPrefix = prefix.replace('▷', '▷⚠️');
    return `${errorPrefix}${text
        .trimRight()
        .replace(/\r?\n|\r/gi, `\r\n${errorPrefix}`)}\r\n`;
};
