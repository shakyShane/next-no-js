import React from "react";
import ReactDOM from "react-dom";

export function hydrate(selector: string, mod: any) {
    const elem = document.querySelector(selector);

    if (elem) {
        ReactDOM.hydrate(React.createElement(mod.default), elem);
    } else {
        console.error("could not find the correct element to hydrate", selector);
    }
}
