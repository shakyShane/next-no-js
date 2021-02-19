import {loadFromRemote} from "./remote-loader/load-from-remote";

// @ts-ignore
import("modfedManifest")
    .then(manifest => (manifest as any).namedChunkGroups)
    .then(namedChunkGroups => {
        // console.log('got named chunk groups', namedChunkGroups);
        return init(namedChunkGroups);
    })
    .catch((e) => {
        console.error("no manifest", e);
    });

function init(manifest) {
    const matches = document.querySelectorAll("[data-modfed-type]");
    matches.forEach((elem) => {
        const { modfedId, modfedType } = (elem as any).dataset;
        const match = manifest[modfedId];
        const data = document.querySelector(`[data-modfed-data="${modfedId}"]`);
        const parsedData = JSON.parse(data?.textContent ?? "null");
        if (match) {
            if (modfedType === "preact") {
                loadPreact(match, elem, parsedData)
                    .then((x) => {
                        console.log("all done!");
                    })
                    .catch((e) => {
                        console.error("error", e);
                    });
                loadVanilla(match, elem, parsedData)
                    .then((x) => {
                        console.log("all done!");
                    })
                    .catch((e) => {
                        console.error("error", e);
                    });
            }
        } else {
            console.error(`no match found for '${modfedId}', type = `, modfedType);
        }
    });

    async function loadPreact(match, elem, data: any) {
        console.log('loading preact', match, data);
        const preactLoader = await import("./init-preact");

        const loader = await loadFromRemote({
            remote: {
                url: `/_next/static/chunks/modfed/${match.assets[0].name}`,
                name: match.name,
            },
        });
        const mod = await loader();
        preactLoader.hydrate(elem, data, mod);
    }
    async function loadVanilla(match, elem, data: any) {
        const loader = await import("./init-vanilla");
        loader.default(elem, data);
    }
}
