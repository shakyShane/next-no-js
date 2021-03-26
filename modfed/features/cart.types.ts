import { CartValue, PublicContext } from "./cart.machine";
import { AppValue } from "~/modfed/features/app.machine";
import { GLOBAL_PROXY } from "~/modfed/constants";

export enum CartNameSpaces {
    Store = "cart:state",
    Send = "@machine.cart",
    Notify = "@machine.cart.notify",
}

export interface CartStateEvent {
    type: "cart:state";
    payload: {
        value: AppValue;
        context: PublicContext;
    };
}

export interface CartAddEvent {
    type: "cart:add";
    payload: { sku: string; qty: number };
}

export interface CartOpenEvent {
    type: "minicart:open";
}

export interface CartCloseEvent {
    type: "minicart:close";
}

// prettier-ignore
export type CartEvents =
    | CartAddEvent
    | CartOpenEvent
    | CartCloseEvent

export function send(evt: CartEvents, elem: HTMLElement | Document = document) {
    elem.dispatchEvent(
        new CustomEvent(CartNameSpaces.Send, {
            detail: evt,
            bubbles: true,
        })
    );
}

export function cartListen(fn: (value: CartValue, context: PublicContext) => any, elem?: HTMLElement) {
    const listener = (evt: CustomEvent<CartStateEvent>) => {
        fn(evt.detail.payload.value, evt.detail.payload.context);
    };
    // @ts-ignore
    document.addEventListener(CartNameSpaces.Notify, listener);
    // @ts-ignore
    return () => document.removeEventListener(CartNameSpaces.Notify, listener);
}

export function initialCart(): { value: CartValue; context: PublicContext } {
    if (typeof window !== "undefined" && window[GLOBAL_PROXY]) {
        return window[GLOBAL_PROXY][CartNameSpaces.Store];
    }
    return { value: "closed", context: { open: false, items_count: 0 } };
}
