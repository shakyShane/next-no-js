import "./wc";
import { cartMachine as cartMachine } from "./features/cart.machine";
import { interpret, StateMachine } from "xstate";

import { inspect } from "@xstate/inspect";
import { appMachine } from "~/modfed/features/app.machine";
import { GLOBAL_PROXY } from "~/modfed/constants";

if (process.env.NODE_ENV === "development") {
    inspect({
        iframe: false,
    });
}

// @ts-ignore
window.__unstable_register = register;

export function global() {
    window[GLOBAL_PROXY] = {};

    register(appMachine);
    register(cartMachine);
}

interface RegisterOpts {
    storeName: string;
    namespace: string;
    send: string;
}

function register(machine: StateMachine<any, any, any>, refs: any[] = []) {
    if (window[GLOBAL_PROXY]?.[machine.id]) {
        console.warn("BAIL - machine with id `%s` already registered", machine.id);
        return;
    }
    window[GLOBAL_PROXY][machine.id] = {
        initial: {
            value: machine.initialState.value,
            context: machine.initialState.context,
        },
    };
    const lazyRef = (refName: string) => {
        const match = window[GLOBAL_PROXY]?.[refName];
        if (!match) {
            throw new Error(`Service missing... ${refName}`);
        }
        return match.srv;
    };
    const srv = interpret(machine.withContext({ ...machine.context, ref: lazyRef }), { devTools: true })
        .onChange((context) => {
            console.log("context change", context);
        })
        .onTransition((t) => {})
        .start();
    window[GLOBAL_PROXY][machine.id].srv = srv;
}
