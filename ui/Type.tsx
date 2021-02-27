import React, { AnchorHTMLAttributes, HTMLAttributes, PropsWithChildren } from "react";
import Link from "next/link";

export const P = (props) => <p className="my-5">{props.children}</p>;
export const Code = (props) => (
    <code className="text-sm p-1 border-2 border-gray-300 bg-gray-200 rounded">{props.children}</code>
);

export function ALink(props: PropsWithChildren<AnchorHTMLAttributes<any>>) {
    const { children, href, ...rest } = props;
    return (
        <Link href={href}>
            <a className="underline hover:no-underline cursor-pointer" {...rest}>
                {props.children}
            </a>
        </Link>
    );
}

export function A(props: PropsWithChildren<AnchorHTMLAttributes<any>>) {
    const { children, ...rest } = props;
    return (
        <a className="underline hover:no-underline cursor-pointer" {...rest}>
            {props.children}
        </a>
    );
}
export function AltA(props: PropsWithChildren<AnchorHTMLAttributes<any>>) {
    const { children, ...rest } = props;
    return (
        <a className="text-green-500 no-underline hover:underline" {...rest}>
            {props.children}
        </a>
    );
}

export function H1(props: PropsWithChildren<any>) {
    return (
        <h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">
            {props.children}
        </h1>
    );
}

export function H2(props: PropsWithChildren<any>) {
    return (
        <h2 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-2xl md:text-2xl">
            {props.children}
        </h2>
    );
}

export function H3(props: PropsWithChildren<any>) {
    return (
        <h3 className="font-bold font-sans break-normal text-gray-900 pt-4 pb-2 text-1xl md:text-1xl">
            {props.children}
        </h3>
    );
}

export function UL(props: PropsWithChildren<HTMLAttributes<any>>) {
    const { children, ...rest } = props;
    return (
        <ul className="mb-6 mt-2 list-disc" {...rest}>
            {children}
        </ul>
    );
}

export function LI(props: PropsWithChildren<HTMLAttributes<any>>) {
    const { children, ...rest } = props;
    return (
        <li className="ml-10" {...rest}>
            {children}
        </li>
    );
}

export function DemoBlock(props: PropsWithChildren<any>) {
    return <div className="my-6 border-4 border-purple-500 p-4">{props.children}</div>;
}

export function HomeLink() {
    return (
        <p className="font-sans text-base mb-4 md:text-sm text-green-500 font-bold">
            <Link href={"/"}>
                <a className="text-base md:text-sm text-green-500 font-bold no-underline hover:underline">
                    &lt; BACK HOME
                </a>
            </Link>
        </p>
    );
}
