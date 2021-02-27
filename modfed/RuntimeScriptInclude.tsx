import { join } from "path";
import { existsSync, readFileSync } from "fs";

let manifest;
let bootstrap;
let CWD = process.cwd();
let NEXT_DIR = existsSync(join(CWD, ".next"));
let MANIFEST_EXISTS = existsSync(join(CWD, ".next", "modfed-entry.json"));

if (process.env.NODE_ENV === "production") {
    try {
        const str = readFileSync(join(CWD, ".next", "modfed-entry.json"), "utf8");
        manifest = JSON.parse(str);
        const entry = manifest.children.find((child) => child.name === "modfed-entry");
        bootstrap = entry.assetsByChunkName.bootstrap[0];
        if (!bootstrap) {
            console.error("could not load bootstrap");
        }
    } catch (e) {
        console.error("could not read modfed manifest");
    }
}

export function RuntimeScriptInclude(props: { html: string }) {
    if (process.env.NODE_ENV === "production") {
        if (!bootstrap) {
            return (
                <div
                    dangerouslySetInnerHTML={{
                        __html: `<!-- missing bootstrap, cwd: ${CWD}, .next exists: ${String(
                            NEXT_DIR
                        )}, manifest exists: ${String(MANIFEST_EXISTS)} -->`,
                    }}
                />
            );
        } else {
            if (!props.html.includes("data-modfed-kind")) {
                return <div dangerouslySetInnerHTML={{ __html: `<!-- no JS components found -->` }} />;
            } else {
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
                        <script src={`/_next/static/chunks/modfed/${bootstrap}`} />
                    </>
                );
            }
        }
    }
    console.log("not adding JS");
    return null;
}
