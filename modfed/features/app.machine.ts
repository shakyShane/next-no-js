import { Interpreter, Machine } from "xstate";
import { AppEvents } from "./app.dom";
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
export type Send = Interpreter<Context, Schema, AppEvents>["send"];
export const MACHINE_ID = "app";

export const appMachine = Machine<Context, Schema, AppEvents>(
    {
        id: MACHINE_ID,
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
