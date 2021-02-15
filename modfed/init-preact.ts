import React from "react";
import ReactDOM from "react-dom";
const items = document.querySelectorAll(`[data-modfed-type="preact"]`);

items.forEach((item: HTMLDivElement) => {
    const { modfedId, modfedComponent } = item.dataset;
    const data = document.querySelector(`[data-modfed-data="${modfedId}"]`);
    const parsed = JSON.parse(data?.textContent ?? "null");

    import(`../components/${modfedComponent}`).then((mod) => {
        ReactDOM.hydrate(React.createElement(mod.default, parsed), item);
    });
});
