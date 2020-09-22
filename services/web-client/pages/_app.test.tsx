import { ApolloClient } from '@apollo/client';
import { test, describe, expect } from '@jest/globals';
import { shallow } from 'enzyme';
import { WithApolloState } from 'next-with-apollo';
import App, { AppProps } from './_app';

const appPropsMock: AppProps = {
    apollo: ({} as unknown) as ApolloClient<unknown>,
    apolloState: ({} as unknown) as WithApolloState<unknown>,
    pageProps: {} as unknown
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
