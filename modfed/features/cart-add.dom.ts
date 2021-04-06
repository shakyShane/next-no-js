import { cartAddMachine } from "~/modfed/features/cart-add.machine";
import { DoneInvokeEvent } from "xstate";
import { useGlobalService } from "~/modfed/global";

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

export function useCartAddService() {
    return useGlobalService(cartAddMachine);
}
