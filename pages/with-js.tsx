import React from "react";
import dynamic from "next/dynamic";
import { Loader } from "../modfed/Loader";
import styles from "../styles/Home.module.css";
import { Layout } from "../ui/Layout";

const DynamicComponent = dynamic(() => {
    return import(/* webpackChunkName: "modfed-counter" */ "../components/Counter");
});

export default function WithJs() {
    return (
        <Layout
            title={"On-demand JavaScript runtime + Preact"}
            desc={
                "The initial HTML for this page was rendered at build time - so it works without JavaScript\n" +
                "(really, try it)"
            }
            left={
                <>
                    <p className={styles.description}>
                        But, when a page like this contains a Component marked as JS-ENABLED, the 2kb runtime loads, and
                        then loads any micro-bundles required for the component (in this example, that's Preact/compat)
                    </p>
                    <p className={styles.description}>
                        Thanks to Module Federation, if multiple components on the same page share dependencies (eg:
                        Preact) they will 'share' them intelligently
                    </p>
                </>
            }
            right={
                <>
                    <h3>The timer below was server-side rendered</h3>
                    <p>Once the page is ready, a tiny bundle loads and hydrates the markup</p>
                    <div style={{ border: "5px solid purple", padding: "1rem" }}>
                        <Loader modfedId={"counter"} modfedType={"preact"} modfedComponent={"Counter"}>
                            <DynamicComponent />
                        </Loader>
                    </div>
                </>
            }
        />
    );
}

export const config = {
    unstable_runtimeJS: false,
};
