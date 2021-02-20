import Document, { Html, Head, Main, NextScript } from "next/document";
import { RuntimeScriptInclude } from "../modfed/RuntimeScriptInclude";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <RuntimeScriptInclude html={this.props.html} />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
