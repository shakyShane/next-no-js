import React from "react";
import ReactDOM from "react-dom";

const elem = document.querySelector(`[data-modfed-id="Counter"]`);

if (elem) {
    import("./Counter").then(mod => {
        console.log('hydrating');
        ReactDOM.hydrate(
            React.createElement(mod.default),
            elem
        );
    })
}