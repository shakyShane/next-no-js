import React from "react";
import dynamic from 'next/dynamic'
import {Loader} from "../components/Loader";
import styles from "../styles/Home.module.css";

const DynamicComponent = dynamic(() => {
    return import(/* webpackChunkName: "counter" */ '../components/Counter');
})

export default function WithJs() {
    return <div className={styles.container}>
        <div className={styles.main}>
            <h1 className={styles.title}>This page contains regular markup + a React Component (Timer).</h1>
            <h2 className={styles.description}>It's initial HTML was rendered at build time - it works without JS (really, try it)</h2>
            <p className={styles.description}>But, when JS is available it will be 'hydrated' with a
            minimal JS bundle</p>
            <Loader modfedId={"Counter"}>
                <DynamicComponent />
            </Loader>
        </div>
    </div>
}

export const config = {
    unstable_runtimeJS: false
};