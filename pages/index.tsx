import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div>
                    <h1 className={styles.title}>
                        Woop! <span style={{ color: "blue" }}>Next.js, without the JS</span>
                    </h1>
                    <h2 className={styles.description}>
                        A static site, with an opt-in 2kb runtime + granular SSR hydration
                    </h2>
                    <p className={styles.description}>This page has ZERO JavaScript - as it didn't need any</p>
                    <p className={styles.description}>
                        But in the examples below, JS can be loaded on-demand to either hydrate the components, or just
                        to access the markup.
                    </p>
                    <h3>Examples:</h3>
                    <ul>
                        <li>
                            <Link href={"/with-js"}>on-demand SSR hydration</Link>
                        </li>
                        <li>
                            <Link href={"/vanilla-js"}>on-demand vanilla JS</Link>
                        </li>
                    </ul>
                </div>
                <aside className={styles.updates}>
                    <h3>Updates:</h3>
                    <ul>
                        <li>Sun Feb 14th: added content-hashes to filenames in on-demand bundles</li>
                    </ul>
                </aside>
            </main>

            <footer className={styles.footer}>
                <a href="https://twitter.com/shaneosbourne" target="_blank" rel="noopener noreferrer">
                    An experiment by @shaneOsbourne
                </a>
            </footer>
        </div>
    );
}

export const config = {
    unstable_runtimeJS: process.env.NODE_ENV === "development",
};
