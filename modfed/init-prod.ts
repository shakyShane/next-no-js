import { global } from "./global";
import { clear } from "./init-preact";

global();

const hotwire = true;

if (hotwire) {
    import("@hotwired/turbo").then(() => {
        console.log("hotwire loaded");
        document.addEventListener("turbo:load", function () {
            console.log("turbo:load");
            load();
        });
        document.addEventListener("turbo:before-visit", function () {
            console.log("turbo:before-visit");
            clearAll();
        });
    });
} else {
    load();
}

function load() {
    const items = document.querySelectorAll(`[data-modfed-type="preact"]`);
    if (items.length) {
        console.log("trying to attach to %d elements", items.length);
        Promise.all([].map.call(items, (el) => maybeAttach(el)))
            .then((res) => {
                console.log("All done!");
            })
            .catch((e) => {
                console.log("could not dynamically attach", e);
            });
    }
}

async function maybeAttach(el: HTMLElement) {
    try {
        const m = await import("./init-preact");
        m.hydrate(el);
    } catch (e) {
        console.log("could not hydrate ", el);
    }
}

function clearAll() {
    const items = document.querySelectorAll(`[data-modfed-type="preact"]`);
    items.forEach((item) => {
        clear(item as HTMLElement);
    });
}
