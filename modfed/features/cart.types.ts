export type CartAddEvent = {
    type: "cart:add";
    payload: { sku: string; qty: number };
};

// prettier-ignore
export type CartEvents =
    | CartAddEvent
