import { cartMachine as cartMachine } from "./features/cart.machine";
import { interpret } from "xstate";
import { CartNameSpaces } from "./features/cart.types";

import { inspect } from "@xstate/inspect";
import { appMachine } from "~/modfed/features/app.machine";
import { AppNamespaces } from "~/modfed/features/app.dom";
import { GLOBAL_PROXY } from "~/modfed/constants";

if (process.env.NODE_ENV === "development") {
    inspect({
        iframe: false,
    });
}

export function global() {
    window[GLOBAL_PROXY] = {};

    register(appMachine, {
        storeName: AppNamespaces.Store,
        namespace: AppNamespaces.Notify,
        send: AppNamespaces.Send,
    });
    register(cartMachine, {
        storeName: CartNameSpaces.Store,
        namespace: CartNameSpaces.Notify,
        send: CartNameSpaces.Send,
    });
}

interface RegisterOpts {
    storeName: string;
    namespace: string;
    send: string;
}

function register(machine, opts: RegisterOpts) {
    window[GLOBAL_PROXY][opts.storeName] = {
        value: machine.initialState.value,
        context: machine.initialState.context,
    };
    const srv = interpret(machine, { devTools: true })
        .onTransition((t) => {
            window[GLOBAL_PROXY][opts.storeName].value = t.value;
            window[GLOBAL_PROXY][opts.storeName].context = { ...t.context };
            const appEvent = new CustomEvent(opts.namespace, {
                detail: {
                    type: opts.storeName,
                    payload: window[GLOBAL_PROXY][opts.storeName],
                },
            });
            document.dispatchEvent(appEvent);
        })
        .start();

    // @ts-ignore
    document.addEventListener(opts.send, (evt: CustomEvent<any>) => {
        srv.send(evt.detail);
    });
}
