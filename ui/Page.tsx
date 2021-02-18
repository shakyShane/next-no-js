import Head from "next/head";

export function Page(props) {
    return <>
        <Head>
            <title>{props.meta.title}</title>
        </Head>
        <h1>{props.meta.title}</h1>
        {props.children}
    </>
}