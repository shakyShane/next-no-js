import { Machine } from "xstate";
import { AppEvents } from "./app.types";

type Schema = {
    states: {
        closed: Record<string, any>;
        open: Record<string, any>;
    };
};

export type Context = {};
export type PublicContext = Context;
export type States = keyof Schema["states"];

export const appMachine = Machine<Context, Schema, AppEvents>(
    {
        id: "app",
        initial: "closed",
        context: {},
        states: {
            closed: {
                on: {
                    "nav:open": "open",
                },
            },
            open: {
                on: {
                    "nav:close": "closed",
                },
            },
        },
    },
    {
        actions: {},
    }
);
