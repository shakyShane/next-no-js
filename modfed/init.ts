import "@hotwired/turbo";

document.addEventListener("turbo:load", function () {
    const items = document.querySelectorAll(`[data-modfed-type="preact"]`);
    if (items.length) {
        console.log("trying to attach to %d elements", items.length)
        Promise.all([].map.call(items, el => maybeAttach(el))).then(res => {
            console.log('All done!')
        }).catch(e => {
            console.log("could not dynamically attach", e);
        })
    }
});

async function maybeAttach(el: HTMLElement) {
    try {
        const m = await import("./init-preact");
        m.hydrate(el);
    } catch (e) {
        console.log("could not hydrate ", el)
    }
}