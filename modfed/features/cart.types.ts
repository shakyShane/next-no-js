import { PublicContext } from "./cart";

export enum Namespaces {
    Send = "@machine.cart",
    Notify = "@machine.cart.notify",
}

export interface CartStateEvent {
    type: "cart:state";
    payload: PublicContext;
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
        new CustomEvent(Namespaces.Send, {
            detail: evt,
            bubbles: true,
        })
    );
}

export function listen(fn: (context: PublicContext) => any, elem?: HTMLElement) {
    const listener = (evt: CustomEvent<CartStateEvent>) => {
        // console.log("listened to ", evt.detail.payload);
        fn(evt.detail.payload);
    };
    // @ts-ignore
    document.addEventListener(Namespaces.Notify, listener);
    // @ts-ignore
    return () => document.removeEventListener(Namespaces.Notify, listener);
}
