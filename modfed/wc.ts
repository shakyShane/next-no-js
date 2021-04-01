import React from "react";
import ReactDOM from "react-dom";

const oneTimeHydrate = new Map<string, boolean>();

// const observer = new IntersectionObserver(
//     (entries) => {
//         for (const entry of entries) {
//             if (entry.isIntersecting) {
//                 observer.unobserve(entry.target);
//                 const { component, turboPermanent } = (entry.target as HTMLElement).dataset;
//
//                 if (turboPermanent) {
//                     if (oneTimeHydrate.get(component as string) === true) {
//                         console.log("not re-hydrating a one-watcher", component);
//                         return;
//                     }
//                     oneTimeHydrate.set(component as string, true);
//                 }
//
//                 (entry.target as any).hydrate();
//             }
//         }
//     },
//     {
//         rootMargin: "0px",
//         threshold: 0.5,
//     }
// );

class NotesElement extends HTMLElement {
    count = 0;
    constructor(private loader: () => any) {
        super();
    }
    connectedCallback() {
        console.log("connectedCallback", this.dataset.component);
        if (this.dataset.turboPermanent) {
            console.log(this.dataset.component);
            if (oneTimeHydrate.get(this.dataset.component as string) === true) {
                console.log("not re-hydrating a one-watcher", this.dataset.component);
                return;
            }
            oneTimeHydrate.set(this.dataset.component!, true);
        }
        // if (this.isConnected) {
        this.hydrate().catch((e) => {
            console.error("error from hydrate");
        });
        // }
    }

    disconnectedCallback() {
        console.log("disconnectedCallback", this.dataset.component);
        clear(this);
    }

    adoptedCallback() {
        console.log("adoptedCallback", this.dataset.component);
    }

    async hydrate() {
        const modfedComponent = this.dataset.component!;
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
            const data = this.querySelector("script");
            const target = this.querySelector(`[data-inner]`)!;
            const parsed = JSON.parse(data?.textContent ?? "null");
            ReactDOM.hydrate(React.createElement(exported, parsed), target);
        });
    }
}

customElements.define("mad-notes", NotesElement);

export const name = "wc";

export function clear(item: HTMLElement) {
    const { turboPermanent } = item.dataset;

    if (turboPermanent) {
        console.log("refusing to un-mount a permanent element", item);
        return;
    }
    const target = item.querySelector("[data-inner]")!;
    if (target) {
    }
    const asElements = [].map.call(target.childNodes, tearDownElement);
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
