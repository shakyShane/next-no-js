import { PublicContext, States } from "./app.machine";

export enum AppNamespaces {
    Send = "@machine.app",
    Notify = "@machine.app.notify",
}

export interface AppStateEvent {
    type: "app:state";
    payload: {
        value: States;
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

export function appListen(fn: (value: States, context: PublicContext) => any, elem?: HTMLElement) {
    const listener = (evt: CustomEvent<AppStateEvent>) => {
        // console.log("listened to ", evt.detail.payload);
        fn(evt.detail.payload.value, evt.detail.payload.context);
    };
    // @ts-ignore
    document.addEventListener(AppNamespaces.Notify, listener);
    // @ts-ignore
    return () => document.removeEventListener(AppNamespaces.Notify, listener);
}
