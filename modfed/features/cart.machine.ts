import { assign, Interpreter, Machine, send, StateSchema } from "xstate";
import { CartEvents } from "./cart.dom";
import { compose, onEscapeKey, onTurboNav } from "~/modfed/features/common";

type Schema = {
    states: {
        closed: StateSchema;
        open: StateSchema;
    };
};

export type Context = {
    items_count: number;
    originSender: string | undefined;
};

export type Send = Interpreter<Context, Schema, CartEvents>["send"];
export const MACHINE_ID = "cart";

export const cartMachine = Machine<Context, CartEvents>(
    {
        id: MACHINE_ID,
        context: {
            items_count: 0,
            originSender: undefined,
        },
        type: "parallel",
        states: {
            minicart: {
                initial: "closed",
                on: {
                    "minicart:items_count:updated": { target: "minicart.open", actions: "updateItemsCount" },
                },
                states: {
                    closed: {
                        on: {
                            "minicart:open": { target: "open" },
                        },
                    },
                    open: {
                        invoke: {
                            src: "escapeKey",
                        },
                        on: {
                            "minicart:close": { target: "closed" },
                        },
                    },
                },
            },
            cartIdManagement: {
                initial: "idle",
                states: {
                    idle: {
                        on: {
                            "@@request.id": { target: "requested", actions: "saveOriginSender" },
                        },
                    },
                    requested: {
                        after: {
                            100: {
                                target: "idle",
                                actions: send(
                                    { type: "@@incoming.cart.id", payload: "123456" },
                                    {
                                        delay: 1000,
                                        to: (ctx) => ctx.originSender || "cart-add",
                                    }
                                ),
                            },
                        },
                    },
                },
            },
        },
    },
    {
        actions: {
            saveOriginSender: assign<Context, CartEvents>((ctx, evt, meta) => {
                return {
                    ...ctx,
                    originSender: meta._event?.origin,
                };
            }),
            updateItemsCount: assign({
                items_count: (ctx, evt) => {
                    if (evt.type === "minicart:items_count:updated") {
                        return evt.payload.new_items_count;
                    }
                    return ctx.items_count;
                },
            }),
        },
        services: {
            escapeKey: compose([onEscapeKey({ type: "minicart:close" }), onTurboNav({ type: "minicart:close" })]),
        },
    }
);
