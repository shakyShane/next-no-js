import { PublicContext, AppValue } from "./app.machine";
import { GLOBAL_PROXY } from "~/modfed/constants";

export enum AppNamespaces {
    Store = "app:state",
    Send = "@machine.app",
    Notify = "@machine.app.notify",
}

export interface AppStateEvent {
    type: "app:state";
    payload: {
        value: AppValue;
        context: PublicContext;
    };
}

export interface AppOpenEvent {
    type: "nav:open";
}

export interface AppCloseEvent {
    type: "nav:close";
}

// prettier-ignore
export type AppEvents =
    | AppOpenEvent
    | AppCloseEvent

export function appSend(evt: AppEvents, elem: HTMLElement | Document = document) {
    elem.dispatchEvent(
        new CustomEvent(AppNamespaces.Send, {
            detail: evt,
            bubbles: true,
        })
    );
}

export function appListen(fn: (value: AppValue, context: PublicContext) => any, elem?: HTMLElement) {
    const listener = (evt: CustomEvent<AppStateEvent>) => {
        fn(evt.detail.payload.value, evt.detail.payload.context);
    };
    // @ts-ignore
    document.addEventListener(AppNamespaces.Notify, listener);
    // @ts-ignore
    return () => document.removeEventListener(AppNamespaces.Notify, listener);
}

export function initial(): { value: AppValue; context: PublicContext } {
    if (typeof window !== "undefined" && window[GLOBAL_PROXY]) {
        return window[GLOBAL_PROXY][AppNamespaces.Store];
    }
    return { value: "closed", context: {} };
}
