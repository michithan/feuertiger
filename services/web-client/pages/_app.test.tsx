import { test, describe, expect } from '@jest/globals';
import { shallow } from 'enzyme';
import { AppInitialProps } from 'next/app';
import { AppPropsType } from 'next/dist/next-server/lib/utils';
import { Router } from 'next/router';
import App from './_app';

const appPropsMock: AppPropsType<Router, AppInitialProps> = {
    pageProps: {}
} as AppPropsType<Router, AppInitialProps>;

describe('Test nextjs app', () => {
    test('should create _app', () => {
        const component = shallow(
            <App {...appPropsMock}>
                <div>test</div>
            </App>
        );
        expect(component).toMatchSnapshot();
    });
});
