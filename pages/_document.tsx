import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head />
                <body>
                <Main />
                <NextScript />
                {process.env.NODE_ENV === "production" && this.props.html.includes('data-modfed-id') && (
                    <script src={"/_next/static/chunks/modfed/bootstrap.js"} />
                )}
                </body>
            </Html>
        )
    }
}

export default MyDocument