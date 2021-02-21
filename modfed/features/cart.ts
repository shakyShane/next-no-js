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
};

export type PublicContext = Context;

export const machine = Machine<Context, Schema, CartEvents>(
    {
        id: "cart",
        initial: "closed",
        context: {
            open: false,
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
            openCart: assign({ open: true }),
            closeCart: assign({ open: false }),
            addToCart: (ctx, evt) => {
                console.log("got an add to cart message", ctx, evt);
            },
        },
    }
);
