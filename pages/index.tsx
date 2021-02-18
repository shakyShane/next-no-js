import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import {Next, Turbo} from "../ui/Logos";

export default function Home() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div>
                    <style jsx>{`
                        //.logos { display: flex; align-items: center; }                    
                        .plus { font-size: 30px; }                    
                        .logos {text-align: center}
                    `}</style>
                    <div className={"logos"}>
                        <Next />
                        <p className={"plus"}>+</p>
                        <Turbo />
                    </div>
                    <h1 className={styles.title}>
                        Next.js + Turbo + granular hydration
                    </h1>
                    <h2 className={styles.description}>
                        Next.js: to generate the website.
                    </h2>
                    <h2 className={styles.description}>
                        Hotwire Turbo: to enable SPA like navigation
                    </h2>
                    <h2 className={styles.description}>
                        Component-level hydration only when *you* choose
                    </h2>
                    <p className={styles.description}>Check out the first example below. It's a giant page of
                    HTML generated via an MDX page in Next.js - but it incurs ZERO hydration costs when it loads.</p>
                    <p>
                        We're not opting out of JS though, half way down the page there's a gallery
                        that was built with React - when this happens Preact will hydrate JUST that component,
                        meaning perf remains great
                    </p>
                    <h3>Examples:</h3>
                    <ul>
                        <li>
                            <Link href={"/blog"}>Large amount of HTML, with a hydrated component in the middle of</Link>
                        </li>
                    </ul>
                </div>
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
