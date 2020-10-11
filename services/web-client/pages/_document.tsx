import React, { ComponentType } from 'react';
import NextDocument, {
    DocumentContext,
    Head,
    Html,
    Main,
    NextScript
} from 'next/document';
import {
    StyledComponentServerSheets,
    MaterialUiServerServerStyleSheets
} from '@feuertiger/web-components';
import { AppType } from 'next/dist/next-server/lib/utils';

interface Props {
    styledComponentStyleTag: React.ReactElement;
    materialUiStyleTag: React.ReactElement;
}

export default class Document extends NextDocument<Props> {
    static async getInitialProps(context: DocumentContext) {
        const styledComponentSheet = new StyledComponentServerSheets();
        const materialUiSheets = new MaterialUiServerServerStyleSheets();
        const originalRenderPage = context.renderPage;

        try {
            context.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App: AppType) => props =>
                        styledComponentSheet.collectStyles(
                            materialUiSheets.collect(<App {...props} />)
                        )
                });

            const initialProps = await NextDocument.getInitialProps(context);

            const materialUiStyleTag = materialUiSheets.getStyleElement();
            const styledComponentStyleTag = styledComponentSheet.getStyleElement();

            return {
                ...initialProps,
                styledComponentStyleTag,
                materialUiStyleTag
            };
        } finally {
            styledComponentSheet.seal();
        }
    }

    render() {
        const {
            styles,
            materialUiStyleTag,
            styledComponentStyleTag
        } = this.props;
        return (
            <Html>
                <Head>
                    {styles}
                    {materialUiStyleTag}
                    {styledComponentStyleTag}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
