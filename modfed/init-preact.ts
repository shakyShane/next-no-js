import React from "react";
import ReactDOM from "react-dom";
const items = document.querySelectorAll(`[data-modfed-type="preact"]`);

items.forEach((item: HTMLDivElement) => {
    console.log("hydrating", item);
    const { modfedId, modfedComponent, modfedSelf } = item.dataset;
    const data = item.parentElement.querySelector(`[data-modfed-data="${modfedId}"]`);
    const parsed = JSON.parse(data?.textContent ?? "null");

    import(`../components/${modfedComponent}`).then((mod) => {
        if (!mod.default) {
            throw new Error(`"default" missing in module ${modfedComponent}`);
        }

        if (modfedSelf) {
            ReactDOM.render(React.createElement(mod.default, parsed), item.parentElement, item);
        } else {
            ReactDOM.hydrate(React.createElement(mod.default, parsed), item);
        }
    });
});
