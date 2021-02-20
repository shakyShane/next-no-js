import { Machine } from "xstate";
import { CartAddEvent } from "./cart.types";

type Schema = {
    states: { idle: Record<string, any> };
};

type Context = Record<string, any>;

export const machine = Machine<Context, Schema, CartAddEvent>(
    {
        id: "cart",
        initial: "idle",
        states: {
            idle: {
                on: {
                    "cart:add": { actions: "addToCart" },
                },
            },
        },
    },
    {
        actions: {
            addToCart: (ctx, evt) => {
                console.log("got an add to cart message", ctx, evt);
            },
        },
    }
);
