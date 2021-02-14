import { loadFromRemote } from "./remote-loader/load-from-remote";

const elem = document.getElementById("bootstrap");
if (elem) {
    const str = elem.textContent;
    const json = JSON.parse(str);
    load().then(m => {
        console.log('got', m);
    });
}

async function load() {
    const preactLoader = await import("./init-preact");

    const loader = await loadFromRemote({
        remote: {
            url: "/_next/static/chunks/modfed/counter.js",
            name: 'counter'
        }
    });
    const mod = await loader();
    preactLoader.hydrate(`[data-modfed-id="Counter"]`, mod);
    // return mod;
}