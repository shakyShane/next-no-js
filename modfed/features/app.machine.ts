import { Interpreter, Machine, StateSchema } from "xstate";
import { AppEvents } from "./app.dom";
import { compose, onEscapeKey, onTurboNav } from "~/modfed/features/common";

type Schema = {
    states: {
        closed: StateSchema;
        open: StateSchema;
    };
};

export type Context = {
    id: string;
};
export type PublicContext = Context;
export type AppValue = keyof Schema["states"];
export type Send = Interpreter<Context, any, AppEvents>["send"];
export const MACHINE_ID = "app";

export const appMachine = Machine<Context, Schema, AppEvents>(
    {
        id: MACHINE_ID,
        initial: "closed",
        context: {
            id: MACHINE_ID,
        },
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
