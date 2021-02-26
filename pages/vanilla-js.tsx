import React from "react";
import { BrowserComponent } from "../modfed/BrowserComponent";
import Link from "next/link";
import Head from "next/head";
import { Counter } from "../components/Counter";
import { DemoBlock, H1, H2, H3, P } from "../ui/Type";

export default function VanillaJs() {
    return (
        <>
            <Head>
                <title>Next-no-js, on-demand Vanilla JS</title>
            </Head>
            <div>
                <H1>Next JS with on-demand Vanilla JS</H1>
                <H2>The initial HTML for this page was rendered at build time with regular React Components</H2>
                <H3>None of this page's markup with incur any 'hydration' costs at all.</H3>
                <P>
                    But if any Component is marked as 'vanilla-js', then the 2kb runtime will load on demand, which
                    means you can use a regular JS script that allows you to interact with the DOM that was originally
                    created on the server.
                </P>
                <P>
                    Just think of how many times you wanted a small interaction to be handled with plain JS, but still
                    wanted the React Component model for generating the HTML...
                </P>
                <P>
                    Possibly the best part though, the component used for this 'counter' is the exact same one used in
                    the <Link href={"/with-js"}>Preact example</Link>.
                </P>
            </div>
            <div>
                <H2>The timer below was server-side rendered</H2>
                <P>Once the page is ready, a tiny bundle loads and executes, re-using the DOM</P>
                <DemoBlock>
                    <BrowserComponent>
                        <Counter />
                    </BrowserComponent>
                </DemoBlock>
            </div>
        </>
    );
}

export const config = {
    unstable_runtimeJS: false,
};
