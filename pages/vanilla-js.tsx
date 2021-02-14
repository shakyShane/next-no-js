import React from "react";
import dynamic from "next/dynamic";
import { Loader } from "../modfed/Loader";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Head from "next/head";

const DynamicComponent = dynamic(() => {
    return import(/* webpackChunkName: "counter" */ "../components/Counter");
});

export default function VanillaJs() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Next-no-js, on-demand Vanilla JS</title>
            </Head>
            <main className={styles.main}>
                <div>
                    <h1>(decentralised modules) Next JS with on-demand Vanilla JS</h1>
                    <h2 className={styles.description}>
                        The initial HTML for this page was rendered at build time with regular React Components
                    </h2>
                    <p className={styles.description}>
                        None of this page's markup with incur any 'hydration' costs at all.
                    </p>
                    <p>
                        But if any Component is marked as 'vanilla-js', then the 2kb runtime will load on demand, which
                        means you can use a regular JS script that allows you to interact with the DOM that was
                        originally created on the server.
                    </p>
                    <p className={styles.description}>
                        Just think of how many times you wanted a small interaction to be handled with plain JS, but
                        still wanted the React Component model for generating the HTML...
                    </p>
                    <p>
                        Possibly the best part though, the component used for this 'counter' is the exact same one used
                        in the <Link href={"/with-js"}>Preact example</Link>.
                    </p>
                </div>
                <div>
                    <h3>The timer below was server-side rendered</h3>
                    <p>Once the page is ready, a tiny bundle loads and executes, re-using the DOM</p>
                    <div style={{ border: "5px solid purple", padding: "1rem" }}>
                        <Loader modfedId={"counterVanilla"} modfedType={"vanilla"}>
                            <DynamicComponent />
                        </Loader>
                    </div>
                    <br />
                    <Link href={"/"}>Back home</Link>
                </div>
            </main>
        </div>
    );
}

export const config = {
    unstable_runtimeJS: false,
};
