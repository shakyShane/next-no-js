import Head from "next/head";
import styles from "../styles/Home.module.css";
import { GetServerSideProps } from "next";
import Cookies from "cookies";
import { Loader } from "../modfed/Loader";
import FormikForm from "../components/FormikForm";
import { FieldError } from "../lib";

type Props =
    | {
          kind: "login-error";
          values: Record<string, string>;
          errors: FieldError[];
      }
    | {
          kind: "login";
      };

export default function WithForm(props: Props) {
    const formProps = {
        kind: props.kind,
        values: props.kind === "login-error" ? props.values : {},
        errors: props.kind === "login-error" ? props.errors : [],
    };
    return (
        <div className={styles.container}>
            <Head>
                <title>With a form</title>
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
                </div>
                <aside className={styles.updates}>
                    <Loader
                        modfedType={"preact"}
                        modfedId={"FormikForm"}
                        modfedComponent={"FormikForm"}
                        modfedData={formProps}
                    >
                        <FormikForm {...formProps} />
                    </Loader>
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

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res }) => {
    if (req.cookies["error"]) {
        const cookies = new Cookies(req, res);
        cookies.set("error", null);
        const json = JSON.parse(Buffer.from(req.cookies["error"], "base64").toString());
        const { values, errors } = json;
        return {
            props: {
                kind: "login-error",
                values,
                errors,
            },
        };
    }
    return {
        props: {
            kind: "login",
        },
    };
};
