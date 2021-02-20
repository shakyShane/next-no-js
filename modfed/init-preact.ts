import React from "react";
import ReactDOM from "react-dom";
const items = document.querySelectorAll(`[data-modfed-type="preact"]`);

document.addEventListener("add-to-cart", (evt) => {
    console.log("got add-to-cart", evt);
});

items.forEach((item: HTMLDivElement) => {
    console.log("hydrating", item);
    const { modfedId, modfedComponent } = item.dataset;
    const data = document.querySelector(`[data-modfed-data="${modfedId}"]`);
    const parsed = JSON.parse(data?.textContent ?? "null");

    import(`../components/${modfedComponent}`).then((mod) => {
        if (!mod.default) {
            throw new Error(`"default" missing in module ${modfedComponent}`);
        }
        ReactDOM.hydrate(React.createElement(mod.default, parsed), item);
    });
});
