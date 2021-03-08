import { machine as cartMachine } from "./features/cart";
import { interpret } from "xstate";
import { CartEvents, CartStateEvent, Namespaces } from "./features/cart.types";
import "~/browser-components/simple-counter";

import { inspect } from "@xstate/inspect";

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

export function global() {
    document.addEventListener(Namespaces.Send, (evt: CustomEvent<CartEvents>) => {
        cartService.send(evt.detail);
    });
}
