import { loadFromRemote } from "./remote-loader/load-from-remote";

const bootstrap = document.getElementById("bootstrap");
const components = document.getElementById("components");
if (bootstrap && components) {
    const manifest = JSON.parse(components.textContent);
    const matches = document.querySelectorAll("[data-modfed-type]");
    matches.forEach(x => {
        debugger;
        const {modfedId, modfedType} = ((x as any).dataset);
        const match = manifest[modfedId];
        if (match) {
            if (modfedType === "preact") {
                loadPreact(match).then(x => {
                    console.log('all done!')
                }).catch(e => {
                    console.error('error', e);
                });
            }
            if (modfedType === "vanilla") {
                loadVanilla(match).then(x => {
                    console.log('all done!')
                }).catch(e => {
                    console.error('error', e);
                });
            }
        } else {
            console.error(`no match found for ${modfedId}`, modfedType);
        }
    })
}

async function loadPreact(match) {
    const preactLoader = await import("./init-preact");

    const loader = await loadFromRemote({
        remote: {
            url: `/_next/static/chunks/modfed/${match.assets[0].name}`,
            name: match.name
        }
    });
    const mod = await loader();
    preactLoader.hydrate(`[data-modfed-id="${match.name}"]`, mod);
}

async function loadVanilla(match) {
    const loader = await loadFromRemote({
        remote: {
            url: `/_next/static/chunks/modfed/${match.assets[0].name}`,
            name: match.name
        }
    });
    const mod = await loader();
    mod.default()
}