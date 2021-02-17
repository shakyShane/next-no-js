import React from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";

type Props = {
    left: React.ReactNode;
    right: React.ReactNode;
    title: React.ReactNode;
    desc: React.ReactNode;
};

export function Layout(props: Props) {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div>
                    <h1>{props.title}</h1>
                    <h2 className={styles.description}>{props.desc}</h2>
                    {props.left}
                </div>
                <div>
                    {props.right}
                    <br />
                    <Link href={"/"}>Back home</Link>
                </div>
            </main>
        </div>
    );
}
