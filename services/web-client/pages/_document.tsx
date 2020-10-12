import React from 'react';
import NextDocument, { DocumentContext } from 'next/document';
import {
    StyledComponentServerSheets,
    MaterialUiServerServerStyleSheets
} from '@feuertiger/web-components';
import { AppType, DocumentInitialProps } from 'next/dist/next-server/lib/utils';

export default class Document extends NextDocument {
    static async getInitialProps(
        context: DocumentContext
    ): Promise<DocumentInitialProps> {
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
            const styledComponentStyleTags = styledComponentSheet.getStyleElement();

            return {
                ...initialProps,
                styles: [
                    <React.Fragment key="styles">
                        {initialProps.styles}
                        {materialUiStyleTag}
                        {styledComponentStyleTags}
                    </React.Fragment>
                ]
            };
        } finally {
            styledComponentSheet.seal();
        }
    }
}
