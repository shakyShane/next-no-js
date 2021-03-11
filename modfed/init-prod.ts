import { global } from "./global";
import { clear } from "./init-preact";

global();

declare var clickRecorder: any;

const hotwire = true;

if (hotwire) {
    import("@hotwired/turbo").then((mod) => {
        console.log("hotwire loaded", mod);
        document.addEventListener("turbo:load", function () {
            console.log("turbo:load");
            setTimeout(initPreactElements, 5000);
        });
        document.addEventListener("turbo:before-visit", function () {
            console.log("turbo:before-visit");
            clearAll();
        });
    });
} else {
    initPreactElements();
}

function initPreactElements() {
    const items = document.querySelectorAll(`[data-modfed-kind="preact"]`);
    if (items.length) {
        console.log("trying to attach to %d elements", items.length);
        Promise.all([].map.call(items, (el) => maybeAttach(el)))
            .then((res) => {
                console.log("All done!");
                setTimeout(() => {
                    clickRecorder.replay();
                }, 100); // todo: wtf is this 100ms for ?
            })
            .catch((e) => {
                console.log("could not dynamically attach", e);
            });
    }
}

async function maybeAttach(el: HTMLElement) {
    try {
        const m = await import("./init-preact");
        await m.hydrate(el);
    } catch (e) {
        console.error("[hydration error]", el);
        console.error(e);
    }
}

function clearAll() {
    const items = document.querySelectorAll(`[data-modfed-kind="preact"]`);
    items.forEach((item: Element) => {
        clear(item as HTMLElement);
    });
}
