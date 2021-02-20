import React from "react";
import ReactDOM from "react-dom";

export function hydrate(item: HTMLElement) {
    console.log("hydrating", item);
    const { modfedId, modfedComponent, modfedSelf } = item.dataset;
    const data = item.parentElement.querySelector(`[data-modfed-data]`);
    const parsed = JSON.parse(data?.textContent ?? "null");

    import(`../components/${modfedComponent}`).then((mod) => {
        if (!mod.default) {
            throw new Error(`"default" missing in module ${modfedComponent}`);
        }
        if (modfedSelf) {
            console.log("using parent as root");
            ReactDOM.render(React.createElement(mod.default, parsed), item.parentElement, item);
        } else {
            console.log("using wrapped Loader as root");
            ReactDOM.hydrate(React.createElement(mod.default, parsed), item);
        }
    });
}
