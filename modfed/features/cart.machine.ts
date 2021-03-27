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
                    "cart:add": { actions: "addToCart" },
                    "minicart:open": { target: "open", actions: "openCart" },
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
            addToCart: assign({
                items_count: (_ctx) => (_ctx.items_count += 1),
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
