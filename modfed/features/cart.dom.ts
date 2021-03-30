import { useSend, useService } from "~/modfed/features/common";
import { CartValue, MACHINE_ID, PublicContext, Send } from "~/modfed/features/cart.machine";

export interface CartOpenEvent {
    type: "minicart:open";
}

export interface CartUpdateEvent {
    type: "minicart:items_count:updated";
    payload: { new_items_count: number };
}

export interface CartCloseEvent {
    type: "minicart:close";
}

// prettier-ignore
export type CartEvents =
    | CartOpenEvent
    | CartCloseEvent
    | CartUpdateEvent

export function useCartSend(): Send {
    return useSend(MACHINE_ID);
}

export function useCartService(): [{ value: CartValue; context: PublicContext }, Send] {
    return useService(MACHINE_ID) as [{ value: CartValue; context: PublicContext }, Send];
}
