import "tailwindcss/tailwind.css";
import "../styles/highlight.css";
import { Nav } from "../ui/Nav";
import { Footer } from "../ui/Footer";
import { A, Code, H1, H2, H3, HomeLink, LI, P, UL } from "../ui/Type";
import { MDXProvider } from "@mdx-js/react";
import { CodeInPre, Pre } from "../components/CodeBlock";

function MyApp({ Component, pageProps, ...rest }) {
    return (
        <>
            <Nav />
            <div className="container w-full md:max-w-3xl mx-auto pt-20 pb-4">
                <div
                    className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal"
                    style={{ fontFamily: "Georgia,serif" }}
                >
                    {rest.router.pathname !== "/" && <HomeLink />}
                    <MDXProvider
                        components={{
                            h1: H1,
                            h2: H2,
                            h3: H3,
                            ul: UL,
                            li: LI,
                            p: P,
                            a: A,
                            code: CodeInPre,
                            inlineCode: Code,
                            pre: Pre,
                        }}
                    >
                        <Component {...pageProps} />
                    </MDXProvider>
                    <div className="pt-4">{rest.router.pathname !== "/" && <HomeLink />}</div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default MyApp;
