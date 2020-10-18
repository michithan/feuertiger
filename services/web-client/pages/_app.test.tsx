import { test, describe, expect } from '@jest/globals';
import { shallow } from 'enzyme';
import { AppInitialProps } from 'next/app';
import App from './_app';

const appPropsMock: AppInitialProps = {
    pageProps: {}
};

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
