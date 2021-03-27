import { useSend, useService } from "~/modfed/features/common";
import { CartValue, MACHINE_ID, PublicContext, Send } from "~/modfed/features/cart.machine";

export interface CartAddEvent {
    type: "cart:add";
    payload: { sku: string; qty: number };
}

export interface CartOpenEvent {
    type: "minicart:open";
}

export interface CartCloseEvent {
    type: "minicart:close";
}

// prettier-ignore
export type CartEvents =
    | CartAddEvent
    | CartOpenEvent
    | CartCloseEvent

export function useCartSend(): Send {
    return useSend(MACHINE_ID);
}

export function useCartService(): [{ value: CartValue; context: PublicContext }, Send] {
    return useService(MACHINE_ID) as [{ value: CartValue; context: PublicContext }, Send];
}
