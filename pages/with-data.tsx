import React from "react";
import dynamic from "next/dynamic";
import { Loader } from "../modfed/Loader";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { GetStaticProps } from "next";

const DynamicComponent = dynamic(() => {
    return import(/* webpackChunkName: "modfed-counter" */ "../components/Gallery");
});

type Props = {
    data: {
        images: string[];
    };
};

export default function WithData(props: Props) {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div>
                    <h1>On-demand hydration with Data</h1>
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
                        <Loader
                            modfedId={"gallery"}
                            modfedType={"preact"}
                            modfedData={props.data}
                            modfedComponent={"Gallery"}
                        >
                            <DynamicComponent {...props.data} />
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
