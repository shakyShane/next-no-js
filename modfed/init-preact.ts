import React from "react";
import ReactDOM from "react-dom";

const oneTimeHydrate = new Map<string, boolean>();

export function hydrate(item: HTMLElement) {
    const { modfedComponent, turboPermanent } = item.dataset;

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

    const data = item.parentElement?.querySelector(`[data-modfed-data="${item.id}"]`);
    const parsed = JSON.parse(data?.textContent ?? "null");

    return import(`../browser-components/${modfedComponent}`).then((mod) => {
        let exported = mod.default;
        if (!exported) {
            console.log("'default' export absent");
            exported = mod[modfedComponent];
        }
        if (!exported) {
            throw new Error(`"default" & "named" export missing in module ${modfedComponent}`);
        }
        console.log("ReactDOM.hydrate", modfedComponent);
        ReactDOM.hydrate(React.createElement(exported, parsed), item);
    });
}

export function clear(item: HTMLElement) {
    const { turboPermanent } = item.dataset;

    if (turboPermanent) {
        console.log("refusing to un-mount a permanent element");
        return;
    }

    const asElements = [].map.call(item.childNodes, tearDownElement);
    ReactDOM.render(asElements, item);
}

function tearDownElement(elem: HTMLElement) {
    const asString = elem.innerHTML;
    const classes = elem.className;
    const tagName = elem.tagName;
    return React.createElement(tagName.toLowerCase(), {
        className: classes,
        dangerouslySetInnerHTML: { __html: asString },
    });
}
