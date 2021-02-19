import React from "react";
import ReactDOM from "react-dom";

export function hydrate(elem: HTMLElement, data: any, mod: any) {
    console.log(elem);
    if (elem) {
        ReactDOM.hydrate(React.createElement(mod.default), elem);
    } else {
        console.error("could not find the correct element to hydrate", elem);
    }
}