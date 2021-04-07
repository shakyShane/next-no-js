import { cartMachine } from "~/modfed/features/cart.machine";
import { useGlobalService } from "~/modfed/global";

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

export interface CartIdRequest {
    type: "@@request.id";
}

// prettier-ignore
export type CartEvents =
    | CartOpenEvent
    | CartCloseEvent
    | CartUpdateEvent
    | CartIdRequest

export function useCartService() {
    return useGlobalService(cartMachine);
}
