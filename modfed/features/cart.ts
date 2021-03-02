import { assign, Machine } from "xstate";
import { CartEvents } from "./cart.types";

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

export const machine = Machine<Context, Schema, CartEvents>(
    {
        id: "cart",
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
    }
);
