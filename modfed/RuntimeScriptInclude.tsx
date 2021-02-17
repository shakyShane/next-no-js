import { join } from "path";
import { readFileSync } from "fs";

let manifest;
let bootstrap;
let components;
let entry;

if (process.env.NODE_ENV === "production") {
    try {
        const str = readFileSync(join(process.cwd(), ".next", "modfed-entry.json"), "utf8");
        manifest = JSON.parse(str);
        entry = manifest.children.find((child) => child.name === "modfed-entry");
        bootstrap = entry.assetsByChunkName.bootstrap[0];
        if (!bootstrap) {
            console.error("could not load bootstrap");
        }
    } catch (e) {
        console.error("could not read modfed manifest");
    }
}

if (process.env.NODE_ENV === "production") {
    try {
        components = entry.namedChunkGroups;
    } catch (e) {
        console.error("could not load component manifest");
    }
}

export function RuntimeScriptInclude(props: { html: string }) {
    if (process.env.NODE_ENV === "production" && bootstrap && props.html.includes("data-modfed-id")) {
        const runtimes = [];
        if (props.html.includes(`data-modfed-type="vanilla"`)) {
            runtimes.push("vanilla");
        }
        if (props.html.includes(`data-modfed-type="preact"`)) {
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
                <script
                    type={"text/json"}
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(components).replace(/</g, "\\u003c") }}
                    id="components"
                />
                <script src={`/_next/static/chunks/modfed/${bootstrap}`} />
            </>
        );
    }

    return null;
}
