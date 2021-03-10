import { assign, Machine } from "xstate";
import { AppEvents } from "./app.types";

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

export const appMachine = Machine<Context, Schema, AppEvents>(
    {
        id: "app",
        initial: "closed",
        context: {
            open: false,
        },
        states: {
            closed: {
                on: {
                    "nav:open": { target: "open", actions: "openNav" },
                },
            },
            open: {
                on: {
                    "nav:close": { target: "closed", actions: "closeNav" },
                },
            },
        },
    },
    {
        actions: {
            openNav: assign({ open: (_) => true }),
            closeNav: assign({ open: (_) => false }),
        },
    }
);
