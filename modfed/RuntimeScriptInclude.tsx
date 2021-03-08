export function RuntimeScriptInclude(props: { html: string }) {
    return <script src={`http://localhost:8080/webpack/bootstrap.js`} />;
    if (process.env.NODE_ENV === "development") {
    }
    if (process.env.NODE_ENV === "production" && process.env.BOOTSTRAP) {
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
                    type="text/json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(json).replace(/</g, "\\u003c") }}
                    id="bootstrap"
                />
                <script src={`/_next/static/chunks/modfed/${process.env.BOOTSTRAP}`} async />
            </>
        );
    }
    return null;
}
