import React from "react";
import { PropsWithChildren } from "react";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import Head from "next/head";
hljs.registerLanguage("javascript", javascript);

export function CodeBlock(props: PropsWithChildren<{ code: string }>) {
    let code = props.code;

    if (props.code[0] === "\n") {
        code = props.code.slice(1);
    }

    let highlighted = hljs.highlight("jsx", code);

    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.2/build/styles/agate.min.css"
                />
            </Head>
            <Pre>
                <code
                    className="block whitespace-pre overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: highlighted.value }}
                />
            </Pre>
        </>
    );
}

export function Pre(props) {
    return <pre className="bg-gray-900 rounded text-white font-mono text-base p-4 mb-4 md:p-4">{props.children}</pre>;
}

export function CodeInPre(props) {
    return <code className="block whitespace-pre overflow-x-auto">{props.children}</code>;
}

function addCss(next: string) {
    const prev = document.querySelector(`link[href="${next}"]`);
    if (!prev) {
        const myCSS = document.createElement("link");
        myCSS.rel = "stylesheet";
        myCSS.href = next;
        // insert it at the end of the head in a legacy-friendly manner
        document.head.insertBefore(myCSS, document.head.childNodes[document.head.childNodes.length - 1].nextSibling);
    }
}
