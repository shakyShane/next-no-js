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

export function global() {
    console.log("ere");
    window[GLOBAL_PROXY] = {};

    register(appMachine);
    register(cartMachine);
}

interface RegisterOpts {
    storeName: string;
    namespace: string;
    send: string;
}

function register(machine: StateMachine<any, any, any>) {
    window[GLOBAL_PROXY][machine.id] = {
        initial: {
            value: machine.initialState.value,
            context: machine.initialState.context,
        },
    };
    const srv = interpret(machine, { devTools: true })
        .onChange((context) => {
            console.log("context change", context);
        })
        .onTransition((t) => {})
        .start();
    window[GLOBAL_PROXY][machine.id].srv = srv;
}
