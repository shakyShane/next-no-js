import { useSend, useService } from "~/modfed/features/common";
import { CartAddValue, MACHINE_ID, PublicContext, Send } from "~/modfed/features/cart-add.machine";
import { DoneInvokeEvent } from "xstate";

export interface CartAddSimple {
    type: "cart-add:simple";
    payload: {
        sku: string;
        qty: number;
    };
}

type AddSimpleService = DoneInvokeEvent<{ qty: number }>;

// prettier-ignore
export type CartAddEvents =
    | CartAddSimple
    | AddSimpleService

export function useCartAddSend(): Send {
    return useSend(MACHINE_ID);
}

export function useCartAddService(): [{ value: CartAddValue; context: PublicContext }, Send] {
    return useService(MACHINE_ID) as [{ value: CartAddValue; context: PublicContext }, Send];
}
