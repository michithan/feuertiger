import { test, describe, expect, beforeAll } from '@jest/globals';
import App, { AppProps } from './_app';
import renderer from 'react-test-renderer'; // jest.setup.js
import { setConfig } from 'next/config';
import config from '../next.config';

const appPropsMock: AppProps = {
    auth: {
        signInWithEmailAndPassword: () => {},
        signOut: () => {}
    },
    error: undefined,
    apollo: {},
    isLoading: false,
    isSignedIn: true,
    pageProps: {}
};

describe('Test nextjs app', () => {
    beforeAll(() => setConfig(config));
    test('should create _app', () => {
        const component = renderer.create(
            <App {...appPropsMock}>
                <div>test</div>
            </App>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
