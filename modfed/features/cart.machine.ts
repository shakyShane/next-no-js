import { assign, DoneInvokeEvent, Interpreter, Machine, send, StateSchema } from "xstate";
import { CartEvents } from "./cart.dom";
import { compose, onEscapeKey, onTurboNav } from "~/modfed/features/common";
import { log, pure } from "xstate/lib/actions";
import { createCart } from "~/queries/__generated__/createCart";
import gql from "graphql-tag";
import invariant from "tiny-invariant";

type Schema = {
    states: {
        closed: StateSchema;
        open: StateSchema;
    };
};

export type Context = {
    items_count: number;
    cartId: string | undefined;
    originSender: string[];
};

export type Send = Interpreter<Context, Schema, CartEvents>["send"];
export const MACHINE_ID = "cart";

export const cartMachine = Machine<Context, CartEvents>(
    {
        id: MACHINE_ID,
        context: {
            items_count: 0,
            originSender: [],
            cartId: undefined,
        },
        type: "parallel",
        states: {
            minicart: {
                initial: "closed",
                on: {
                    "minicart:items_count:updated": { target: "minicart.open", actions: "updateItemsCount" },
                },
                states: {
                    closed: {
                        on: {
                            "minicart:open": { target: "open" },
                        },
                    },
                    open: {
                        invoke: {
                            src: "escapeKey",
                        },
                        on: {
                            "minicart:close": { target: "closed" },
                        },
                    },
                },
            },
            cartIdManagement: {
                initial: "idle",
                states: {
                    idle: {
                        on: {
                            "@@request.id": { target: "requested", actions: "saveOriginSender" },
                        },
                    },
                    requested: {
                        always: [{ cond: "hasId", target: "broadcasting" }, { target: "creatingCart" }],
                    },
                    creatingCart: {
                        invoke: {
                            src: "createCart",
                            onDone: { target: "broadcasting", actions: ["assignCartId", "broadcastCartId"] },
                            onError: {
                                target: "idle",
                                actions: log((c, e) => {
                                    console.log(c, e);
                                }),
                            },
                        },
                    },
                    broadcasting: {
                        exit: "clearOriginSenders",
                        always: "idle",
                    },
                },
            },
        },
    },
    {
        guards: {
            hasId: (ctx) => Boolean(ctx.cartId),
        },
        actions: {
            assignCartId: assign<Context, CartEvents>({
                cartId: (_ctx, evt: CartEvents | DoneInvokeEvent<string>) => {
                    if (evt.type === "done.invoke.createCart") {
                        return evt.data;
                    }
                    return _ctx.cartId;
                },
            }),
            clearOriginSenders: assign({ originSender: (_ctx) => [] }),
            broadcastCartId: pure<Context, CartEvents>((ctx, evt: CartEvents | DoneInvokeEvent<string>) => {
                if (evt && evt.type === "done.invoke.createCart") {
                    return ctx.originSender.map((sender) => {
                        return send({ type: "@@incoming.cart.id", payload: evt.data }, { to: sender });
                    });
                }
                return undefined;
            }),
            saveOriginSender: assign<Context, CartEvents>({
                originSender: (ctx, evt, meta) => {
                    if (meta._event?.origin) {
                        return ctx.originSender.concat(meta._event?.origin);
                    }
                    return ctx.originSender;
                },
            }),
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
            escapeKey: compose([onEscapeKey({ type: "minicart:close" }), onTurboNav({ type: "minicart:close" })]),
            createCart: async () => {
                const { createApolloClient } = await import("~/lib/apollo");
                const client = createApolloClient();
                const res = await client.mutate<createCart>({
                    mutation: gql`
                        mutation createCart {
                            createEmptyCart
                        }
                    `,
                });
                invariant(typeof res?.data?.createEmptyCart === "string", "must have access to the string ID");
                return res?.data?.createEmptyCart;
            },
        },
    }
);
