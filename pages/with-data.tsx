import React from "react";
import dynamic from "next/dynamic";
import { Loader } from "../modfed/Loader";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { GetStaticProps } from "next";
import Head from "next/head";

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
            <Head>
                <title>on-demand, component-level hydration</title>
            </Head>
            <main className={styles.main}>
                <div>
                    <h1>on-demand, component-level hydration</h1>
                    <h2 className={styles.description}>
                        This page uses the regular `getStaticProps` from NextJS to get some image data.
                    </h2>
                    <p className={styles.description}>
                        You then write the Gallery feature as a regular idiomatic React component - using click
                        handlers, accessing data, adding CSS etc
                    </p>
                    <p className={styles.description}>
                        But then when the page loads in the browser, the runtime will notice that there's a component to
                        hydrate and it will load in Preact along with <strong>just enough</strong> data to re-hydrate
                        this component alone - NOT the entire page. Seriously, go and view:source to see what I mean :)
                    </p>
                    <p>
                        JS saving on this page: <strong>63kb</strong>
                    </p>
                </div>
                <div>
                    <h3>The gallery below was server-side rendered</h3>
                    <p>Reload the page without JS to try it out</p>
                    <div style={{ border: "1px dotted purple", padding: "10px" }}>
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
