import { machine as cartMachine } from "./features/cart";
import { interpret } from "xstate";
import { CartEvents, CartStateEvent, Namespaces } from "./features/cart.types";
import { AppEvents, AppNamespaces, AppStateEvent } from "./features/app.types";

import { inspect } from "@xstate/inspect";
import { appMachine } from "~/modfed/features/app.machine";

if (process.env.NODE_ENV === "development") {
    inspect({
        iframe: false,
    });
}

const cartService = interpret(cartMachine, { devTools: true })
    .onTransition((t) => {
        console.log("next", { ...t.context });
        const state = new CustomEvent<CartStateEvent>(Namespaces.Notify, {
            detail: { type: "cart:state", payload: { ...t.context } },
        });
        document.dispatchEvent(state);
    })
    .start();

const appService = interpret(appMachine, { devTools: true })
    .onTransition((t) => {
        console.log("next", { ...t.context });
        const state = new CustomEvent<AppStateEvent>(AppNamespaces.Notify, {
            detail: { type: "app:state", payload: { value: t.value, context: t.context } },
        });
        document.dispatchEvent(state);
    })
    .start();

export function global() {
    // @ts-ignore
    document.addEventListener(Namespaces.Send, (evt: CustomEvent<CartEvents>) => {
        cartService.send(evt.detail);
    });
    // @ts-ignore
    document.addEventListener(AppNamespaces.Send, (evt: CustomEvent<AppEvents>) => {
        appService.send(evt.detail);
    });
}
