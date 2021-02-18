import React from "react";
import ReactDOM from "react-dom";

export function hydrate(el: HTMLElement) {
    const { modfedId, modfedComponent } = el.dataset;
    const data = document.querySelector(`[data-modfed-data="${modfedId}"]`);
    const parsed = JSON.parse(data?.textContent ?? "null");

    import(`../components/${modfedComponent}`).then((mod) => {
        ReactDOM.hydrate(React.createElement(mod.default, parsed), el);
    });
}
