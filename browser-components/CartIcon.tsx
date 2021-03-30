import React, { useCallback, useEffect, useRef, useState } from "react";
import { useCartService } from "~/modfed/features/cart.dom";

/**
 * Just the cart icon in the header
 * @constructor
 */
export function CartIcon() {
    const ref = useRef<HTMLButtonElement>(null);
    const [{ context }, send] = useCartService();
    console.log(context.items_count);

    return (
        <button
            className="text-gray-600 focus:outline-none relative"
            onClick={() => send({ type: "minicart:open" })}
            ref={ref}
        >
            <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {context.items_count > 0 && (
                <span
                    className={
                        "absolute top-0 bg-blue-600 rounded-full w-6 h-6 text-white text-sm flex items-center justify-center"
                    }
                >
                    {context.items_count}
                </span>
            )}
        </button>
    );
}

export default CartIcon;
