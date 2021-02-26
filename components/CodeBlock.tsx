import React, { useEffect, useRef } from "react";
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
    // useEffect(() => {
    //     addCss("//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.2/build/styles/agate.min.css");
    // }, []);
    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.3.2/build/styles/agate.min.css"
                />
            </Head>
            <pre className="bg-gray-900 rounded text-white font-mono text-base p-4 mb-4 md:p-4">
                <code
                    className="block whitespace-pre overflow-x-scroll"
                    dangerouslySetInnerHTML={{ __html: highlighted.value }}
                />
            </pre>
        </>
    );
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
