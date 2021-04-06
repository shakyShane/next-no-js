import { cartMachine as cartMachine } from "./features/cart.machine";
import { EventObject, interpret, Interpreter, StateMachine } from "xstate";

import { inspect } from "@xstate/inspect";
import { appMachine } from "~/modfed/features/app.machine";
import { GLOBAL_PROXY } from "~/modfed/constants";
import { useMachine, useService } from "@xstate/react";

if (process.env.NODE_ENV === "development") {
    if (typeof window !== "undefined") {
        inspect({
            iframe: false,
        });
    }
}

export function global() {
    window[GLOBAL_PROXY] = {};
    registerGlobalService(appMachine);
    registerGlobalService(cartMachine);
}

function registerGlobalService(machine: StateMachine<any, any, any>, refs: any[] = []) {
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
    const srv = interpret(machine.withContext({ ...machine.context, ref: lazyRef }), { devTools: true })
        .onChange((context) => {
            console.log("context change", context);
        })
        .onTransition((t) => {})
        .start();
    window[GLOBAL_PROXY][machine.id].srv = srv;
}

export const lazyRef = (refName: string) => {
    const match = window[GLOBAL_PROXY]?.[refName];
    if (!match) {
        throw new Error(`Service missing... ${refName}`);
    }
    return match.srv;
};

/**
 * A use-machine helper with access to lazyref
 * @param sm
 */
export function useMachineWithRef<Context extends any, Events extends EventObject>(
    sm: StateMachine<Context, any, Events>
) {
    return useMachine(sm.withContext({ ...sm.context, ref: lazyRef }), { devTools: true });
}

export function useGlobalService<Context extends any, Events extends EventObject>(
    sm: StateMachine<Context, any, Events>
) {
    if (typeof window === "undefined") {
        const [state, send] = useMachine(sm);
        return [state, send] as const;
    }
    const match = window[GLOBAL_PROXY]?.[sm.id];
    if (!match) {
        const [state, send] = useMachine(sm);
        return [state, send] as const;
    }
    return useService(match.srv as Interpreter<Context, any, Events>);
}
