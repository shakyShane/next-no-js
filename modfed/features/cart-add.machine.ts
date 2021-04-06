import { Interpreter, Machine, send, StateSchema } from "xstate";
import { CartAddEvents } from "~/modfed/features/cart-add.dom";
import { pure } from "xstate/lib/actions";

type Schema = {
    states: {
        idle: StateSchema;
        adding: StateSchema;
        added: StateSchema;
        errored: StateSchema;
    };
};

export type Context = {
    ref: (address: string) => Interpreter<any, any>;
};

export type CartAddValue = keyof Schema["states"];
export type Send = Interpreter<Context, Schema, CartAddEvents>["send"];
export const MACHINE_ID = "cart-add";

export const cartAddMachine = Machine<Context, CartAddEvents>(
    {
        id: MACHINE_ID,
        initial: "idle",
        context: {
            // @ts-ignore
            ref: null,
        },
        states: {
            idle: {
                on: {
                    "cart-add:simple": { target: "adding" },
                },
            },
            adding: {
                invoke: {
                    src: "addSimple",
                    onDone: { target: "added", actions: "notifyRefs" },
                    onError: "errored",
                },
            },
            added: {
                after: {
                    1000: "idle",
                },
            },
            errored: {
                on: {
                    "cart-add:simple": { target: "adding" },
                },
            },
        },
    },
    {
        actions: {
            notifyRefs: pure((ctx, evt: CartAddEvents) => {
                if (evt.type === "done.invoke.addSimple") {
                    return send(
                        { type: "minicart:items_count:updated", payload: { new_items_count: evt.data.qty } },
                        { to: (ctx) => ctx.ref("cart") }
                    );
                }
            }),
        },
        services: {
            addSimple: () => {
                return new Promise((res) => setTimeout(() => res({ qty: 1 }), 2000));
            },
        },
    }
);
