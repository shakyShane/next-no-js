import { assign, Interpreter, Machine } from "xstate";
import { CartEvents } from "./cart.dom";
import { compose, onEscapeKey, onTurboNav } from "~/modfed/features/common";

type Schema = {
    states: {
        closed: Record<string, any>;
        open: Record<string, any>;
    };
};

export type Context = {
    open: boolean;
    items_count: number;
};

export type PublicContext = Context;
export type CartValue = keyof Schema["states"];
export type Send = Interpreter<Context, Schema, CartEvents>["send"];
export const MACHINE_ID = "cart";

export const cartMachine = Machine<Context, Schema, CartEvents>(
    {
        id: MACHINE_ID,
        initial: "closed",
        context: {
            open: false,
            items_count: 0,
        },
        states: {
            closed: {
                on: {
                    "minicart:open": { target: "open", actions: "openCart" },
                    "minicart:items_count:updated": { actions: "updateItemsCount" },
                },
            },
            open: {
                invoke: {
                    src: "escapeKey",
                },
                on: {
                    "minicart:close": { target: "closed", actions: "closeCart" },
                },
            },
        },
    },
    {
        actions: {
            openCart: assign({ open: (_) => true }),
            closeCart: assign({ open: (_) => false }),
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
            // prettier-ignore
            escapeKey: compose([
        onEscapeKey({ type: "minicart:close" }),
        onTurboNav({ type: "minicart:close" })
      ]),
        },
    }
);
