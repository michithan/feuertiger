import React from 'react';
import NextDocument, {
    DocumentContext,
    DocumentInitialProps
} from 'next/document';
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/styles';
import { AppType } from 'next/dist/next-server/lib/utils';

export default class Document extends NextDocument {
    static async getInitialProps(
        ctx: DocumentContext
    ): Promise<DocumentInitialProps> {
        const styledComponentSheet = new StyledComponentSheets();
        const materialUiSheets = new MaterialUiServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App: AppType) => props =>
                        styledComponentSheet.collectStyles(
                            materialUiSheets.collect(<App {...props} />)
                        )
                });

            const initialProps = await NextDocument.getInitialProps(ctx);

            return {
                ...initialProps,
                styles: [
                    <React.Fragment key="styles">
                        {initialProps.styles}
                        {materialUiSheets.getStyleElement()}
                        {styledComponentSheet.getStyleElement()}
                    </React.Fragment>
                ]
            };
        } finally {
            styledComponentSheet.seal();
        }
    }
}
