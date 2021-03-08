import React from "react";
import ReactDOM from "react-dom";

const oneTimeHydrate = new Map<string, boolean>();

export function hydrate(item: HTMLElement) {
    const { modfedComponent, modfedSelf, turboPermanent } = item.dataset;

    if (!modfedComponent) {
        console.log("ere");
        throw new Error("Missing Component name. ");
    }

    if (turboPermanent) {
        if (oneTimeHydrate.get(modfedComponent) === true) {
            console.log("not re-hydrating a one-watcher");
            return;
        }
        oneTimeHydrate.set(modfedComponent, true);
    }

    const data = item.parentElement.querySelector(`[data-modfed-data]`);
    const parsed = JSON.parse(data?.textContent ?? "null");

    import(`../browser-components/${modfedComponent}`).then((mod) => {
        if (!mod.default) {
            throw new Error(`"default" missing in module ${modfedComponent}`);
        }
        if (modfedSelf) {
            console.log("ReactDOM.render", modfedComponent);
            const { turboPermanent } = item.parentElement.dataset;

            ReactDOM.render(React.createElement(mod.default, parsed), item.parentElement, item);
        } else {
            console.log("ReactDOM.hydrate");
            ReactDOM.hydrate(React.createElement(mod.default, parsed), item);
        }
    });
}

export function clear(item: HTMLElement) {
    const { modfedSelf, turboPermanent } = item.dataset;

    if (turboPermanent) {
        console.log("refusing to un-mount a permanent element");
        return;
    }

    if (modfedSelf) {
        ReactDOM.render(null, item.parentElement);
    } else {
        // console.log("clearing a mount", item);
        ReactDOM.render(null, item);
    }
}
