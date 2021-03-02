import React, { useCallback, useRef } from "react";
import { send } from "~/modfed/features/cart.types";

/**
 * Just the cart icon in the header
 * @constructor
 */
export function CartIcon() {
    const ref = useRef<HTMLButtonElement>(null);
    const onClick = useCallback(() => {
        send({ type: "minicart:open" }, ref.current);
    }, []);
    return (
        <div className="mx-4 sm:mx-0">
            <button
                className="text-gray-600 focus:outline-none"
                onClick={onClick}
                data-modfed-component={"CartIcon"}
                data-modfed-kind={"preact"}
                data-modfed-self
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
            </button>
        </div>
    );
}

export default CartIcon;
