import React from "react";
import { BrowserComponent } from "../modfed/BrowserComponent";
import { Code, DemoBlock, H1, H2, H3, P } from "../ui/Type";
import { GetStaticProps } from "next";
import Head from "next/head";
import { Gallery } from "../components/Gallery";
import { CodeBlock } from "../components/CodeBlock";

type Props = {
    data: {
        images: string[];
    };
};

export default function WithData(props: Props) {
    return (
        <>
            <Head>
                <title>on-demand, component-level hydration</title>
            </Head>
            <div>
                <H1>on-demand, component-level hydration</H1>
                <H2>This page uses the regular `getStaticProps` from NextJS to get some image data.</H2>
                <P>
                    You then write the Gallery feature as a regular idiomatic React component - using click handlers,
                    accessing data, adding CSS etc
                </P>
                <P>
                    But then when the page loads in the browser, the runtime will notice that there's a component to
                    hydrate and it will load in Preact along with <strong>just enough</strong> data to re-hydrate this
                    component alone - NOT the entire page. Seriously, go and view:source to see what I mean :)
                </P>
                <H2>But how does it look in code?</H2>
                <P>The default with this approach is that EVERYTHING is static/inert by default.</P>
                <P>
                    That means the following code will server-render the HTML for all elements (h1, h2 etc) AND the
                    gallery...
                </P>
                <CodeBlock
                    code={`function App(props) {
    return (
        <main>
            <h1>Welcome</h1>
            <h2>Please view our gallery</h2>
            <Gallery images={props.images} />
        </main>
    )
}`}
                />
                <P>
                    ...but ZERO JavaScript would be loaded onto this page, meaning NO hydration costs. This can really
                    make a difference when you begin to have large pages with hundreds/thousands of DOM nodes
                </P>
                <P>
                    If you <em>do</em> want this to be controlled though, simply wrap it in a{" "}
                    <Code>BrowserComponent</Code>
                </P>
                <CodeBlock
                    code={`function App(props) {
    return (
        <main>
            <h1>Welcome</h1>
            <h2>Please view our gallery</h2>
            <BrowserComponent>
                <Gallery images={props.images} />
            </BrowserComponent>
        </main>
    )
}`}
                />
                <P>
                    JS saving on this page: <strong>over 55kb</strong>
                </P>
            </div>
            <div>
                <H2>The gallery below was server-side rendered</H2>
                <P>Reload the page without JS to try it out</P>
                <DemoBlock>
                    <BrowserComponent>
                        <Gallery {...props.data} />
                    </BrowserComponent>
                </DemoBlock>
            </div>
        </>
    );
}

export const config = {
    unstable_runtimeJS: false,
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    return {
        props: {
            data: {
                images: [
                    "https://source.unsplash.com/ZCHj_2lJP00/600x600",
                    "https://source.unsplash.com/2JcixB1Ky3I/600x600",
                    "https://source.unsplash.com/hxn2HjZHyQE/600x600",
                ],
            },
        },
    };
};
