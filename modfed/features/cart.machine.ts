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
    origin: string | undefined;
};

export type Send = Interpreter<Context, Schema, CartEvents>["send"];
export const MACHINE_ID = "cart";

export const cartMachine = Machine<Context, CartEvents>(
    {
        id: MACHINE_ID,
        initial: "closed",
        context: {
            items_count: 0,
            origin: undefined,
        },
        states: {
            closed: {
                on: {
                    "@@request.id": { target: "requested", actions: "saveOrigin" },
                    "minicart:open": { target: "open" },
                    "minicart:items_count:updated": { target: "open", actions: "updateItemsCount" },
                },
            },
            requested: {
                after: {
                    100: {
                        actions: send(
                            { type: "@@incoming.cart.id", payload: "123456" },
                            {
                                delay: 1000,
                                to: (ctx) => ctx.origin || "cart-add",
                            }
                        ),
                    },
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
    {
        actions: {
            saveOrigin: assign((ctx, evt, meta) => {
                return {
                    ...ctx,
                    origin: meta._event?.origin,
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
