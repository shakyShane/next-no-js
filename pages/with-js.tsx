import React from "react";
import dynamic from "next/dynamic";
import { Loader } from "../modfed/Loader";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const DynamicComponent = dynamic(() => {
    return import(/* webpackChunkName: "counter" */ "../components/Counter");
});

export default function WithJs() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div>
                    <h1>On-demand JavaScript runtime + Preact</h1>
                    <h2 className={styles.description}>
                        The initial HTML for this page was rendered at build time - so it works without JavaScript
                        (really, try it)
                    </h2>
                    <p className={styles.description}>
                        But, when a page like this contains a Component marked as JS-ENABLED, the 2kb runtime loads, and
                        then loads any micro-bundles required for the component (in this example, that's Preact/compat)
                    </p>
                    <p className={styles.description}>
                        Thanks to Module Federation, if multiple components on the same page share dependencies (eg:
                        Preact) they will 'share' them intelligently
                    </p>
                </div>
                <div>
                    <h3>The timer below was server-side rendered</h3>
                    <p>Once the page is ready, a tiny bundle loads and hydrates the markup</p>
                    <div style={{ border: "5px solid purple", padding: "1rem" }}>
                        <Loader modfedId={"Counter"}>
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
