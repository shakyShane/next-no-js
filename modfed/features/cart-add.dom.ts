import { cartAddMachine } from "~/modfed/features/cart-add.machine";
import { useGlobalService } from "~/modfed/global";

export interface CartAddSimple {
    type: "cart-add:simple";
    payload: {
        sku: string;
        qty: number;
    };
}

export interface CartId {
    type: "@@incoming.cart.id";
    payload: string;
}

// prettier-ignore
export type CartAddEvents =
    | CartAddSimple
    | CartId;

export function useCartAddService() {
    return useGlobalService(cartAddMachine);
}
