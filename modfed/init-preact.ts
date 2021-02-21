import React from "react";
import ReactDOM from "react-dom";

export function hydrate(item: HTMLElement) {
    const { modfedId, modfedComponent, modfedSelf, modfedHydrated } = item.dataset;
    console.log("prev", modfedComponent, modfedHydrated);
    if (modfedHydrated) {
        console.log("skipping item hydration");
        return;
    }
    const data = item.parentElement.querySelector(`[data-modfed-data]`);
    const parsed = JSON.parse(data?.textContent ?? "null");

    import(`../components/${modfedComponent}`).then((mod) => {
        if (!mod.default) {
            throw new Error(`"default" missing in module ${modfedComponent}`);
        }
        console.log("hydrating", item);
        item.setAttribute("data-modfed-hydrated", "true");
        if (modfedSelf) {
            console.log("using parent as root");
            ReactDOM.render(React.createElement(mod.default, parsed), item.parentElement, item);
        } else {
            console.log("using wrapped Loader as root");
            ReactDOM.hydrate(React.createElement(mod.default, parsed), item);
        }
    });
}
