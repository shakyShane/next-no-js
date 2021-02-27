export function RuntimeScriptInclude(props: { html: string }) {
    if (process.env.NODE_ENV !== "production") {
        console.log("not adding JS (non-prod)");
        return null;
    }

    if (!process.env.BOOTSTRAP) {
        return <div dangerouslySetInnerHTML={{ __html: `<!-- missing bootstrap -->` }} />;
    }

    if (!props.html.includes("data-modfed-kind")) {
        return <div dangerouslySetInnerHTML={{ __html: `<!-- no JS components found -->` }} />;
    }

    const runtimes = [];
    if (props.html.includes(`data-modfed-kind="vanilla"`)) {
        runtimes.push("vanilla");
    }
    if (props.html.includes(`data-modfed-kind="preact"`)) {
        runtimes.push("preact");
    }
    const json = { runtimes };
    return (
        <>
            <script
                type={"text/json"}
                dangerouslySetInnerHTML={{ __html: JSON.stringify(json).replace(/</g, "\\u003c") }}
                id="bootstrap"
            />
            <script src={`/_next/static/chunks/modfed/${process.env.BOOTSTRAP}`} />
        </>
    );
}
