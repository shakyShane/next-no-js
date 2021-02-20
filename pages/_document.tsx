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
                <Head />
                <body className="h-screen overflow-hidden flex items-center justify-center">
                    <Main />
                    <NextScript />
                    <RuntimeScriptInclude html={this.props.html} />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
