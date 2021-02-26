import Head from "next/head";
import { A, ALink, H1, H2, H3, LI, P, UL } from "../ui/Type";
import { CodeBlock } from "../components/CodeBlock";

export default function Home() {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <H1>
                    Woop! <span style={{ color: "blue" }}>Next.js, without the JS</span>
                </H1>
                <H2>A static site, with an opt-in 2kb runtime + granular SSR hydration</H2>
                <H3>This page has ZERO JavaScript - as it didn't need any</H3>
                <P>
                    But in the examples below, JS can be loaded on-demand to either hydrate the components, or just to
                    access the markup.
                </P>
                <H3>Examples:</H3>
                <UL>
                    <LI>
                        <ALink href={"/with-js"}>on-demand SSR hydration</ALink>
                    </LI>
                    <LI>
                        <ALink href={"/with-data"}>on-demand SSR hydration with `getStaticProps`</ALink>
                    </LI>
                    <LI>
                        <ALink href={"/vanilla-js"}>on-demand vanilla JS</ALink>
                    </LI>
                    <LI>
                        <ALink href={"https://next-no-js-cc0feq40w.vercel.app/"}>
                            Next.js + Turbo + on-demand SSR hydration
                        </ALink>
                    </LI>
                    <LI>
                        <A href={"https://next-no-js-git-decentralized.shaneosbourne8.vercel.app/"}>
                            Examples with decentralised modules (few extra KB, but easier to scale)
                        </A>
                    </LI>
                </UL>
            </div>
            <aside>
                <H3>Updates:</H3>
                <UL>
                    <LI>Sun Feb 14th: added content-hashes to filenames in on-demand bundles</LI>
                    <LI>Sun Feb 14th: added vanilla-js example</LI>
                    <LI>Sun Feb 14th: added decentralised versions</LI>
                    <LI>Mon Feb 15th: added a component-level hydration example with data</LI>
                    <LI>Mon Feb 18th: Next.js + Turbo + on-demand SSR hydration</LI>
                </UL>
            </aside>
        </>
    );
}

export const config = {
    unstable_runtimeJS: process.env.NODE_ENV === "development",
};
