import { Machine } from "xstate";
import { AppEvents, appSend } from "./app.dom";
import { compose, onEscapeKey, onTurboNav } from "~/modfed/features/common";

type Schema = {
    states: {
        closed: Record<string, any>;
        open: Record<string, any>;
    };
};

export type Context = {};
export type PublicContext = Context;
export type AppValue = keyof Schema["states"];

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
                invoke: {
                    src: "escapeKey",
                },
                on: {
                    "nav:close": "closed",
                },
            },
        },
    },
    {
        actions: {},
        services: {
            // prettier-ignore
            escapeKey: compose([
        onEscapeKey({ type: "nav:close" }),
        onTurboNav({ type: "nav:close" })
      ]),
        },
    }
);
