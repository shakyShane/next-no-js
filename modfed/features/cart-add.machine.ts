import { assign, DoneInvokeEvent, Interpreter, Machine, sendParent, StateSchema } from "xstate";
import { CartAddEvents, CartAddSimple } from "~/modfed/features/cart-add.dom";
import { pure } from "xstate/lib/actions";

type Schema = {
    states: {
        idle: StateSchema;
        waitingForCartId: StateSchema;
        adding: StateSchema;
        added: StateSchema;
        errored: StateSchema;
    };
};

export type Context = {
    ref: (address: string) => Interpreter<any, any>;
    next?: CartAddSimple["payload"];
    cartId?: string;
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

            // store the workload
            next: undefined,
        },
        states: {
            idle: {
                on: {
                    "cart-add:simple": { target: "waitingForCartId", actions: ["assignNext", "askForId"] },
                },
            },
            waitingForCartId: {
                on: {
                    "@@incoming.cart.id": { target: "adding", actions: "assignId" },
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
            askForId: sendParent({ type: "@@request.id" }, { delay: 100 }),
            assignNext: assign<Context, CartAddEvents>({
                next: (ctx, evt) => {
                    if (evt.type === "cart-add:simple") {
                        return { ...evt.payload };
                    }
                    return ctx.next;
                },
            }),
            assignId: assign<Context, CartAddEvents>({
                cartId: (ctx, evt) => {
                    if (evt.type === "@@incoming.cart.id") {
                        return evt.payload;
                    } else {
                        return ctx.cartId;
                    }
                },
            }),
            notifyRefs: pure((ctx, evt: DoneInvokeEvent<{ qty: number }> | CartAddEvents) => {
                if (evt.type === "done.invoke.addSimple") {
                    return sendParent({
                        type: "minicart:items_count:updated",
                        payload: { new_items_count: evt.data.qty },
                    });
                }
            }),
        },
        services: {
            addSimple: (ctx) => {
                console.log("ADDING", ctx);
                return new Promise((res) => setTimeout(() => res({ qty: 1 }), 2000));
            },
        },
    }
);
