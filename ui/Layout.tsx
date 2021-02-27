import Head from "next/head";
import { PropsWithChildren } from "react";
import { H1 } from "./Type";

type Props = {
    meta: {
        title: string;
    };
};

export function Layout(props: PropsWithChildren<Props>) {
    return (
        <>
            <Head>
                <title>{props.meta.title}</title>
            </Head>
            <H1>{props.meta.title}</H1>
            {props.children}
        </>
    );
}
