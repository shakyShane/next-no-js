import React, { useCallback, useEffect, useRef, useState } from "react";
import { listen, send } from "~/modfed/features/cart.types";

/**
 * Just the cart icon in the header
 * @constructor
 */
export function CartIcon() {
    const ref = useRef<HTMLButtonElement>(null);
    const [cartCount, setCartCount] = useState(0);
    useEffect(() => {
        const unlisten = listen((state) => {
            setCartCount(state.items_count);
        });
        return () => unlisten();
    }, []);
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
            {cartCount > 0 && (
                <span
                    className={
                        "absolute top-0 bg-blue-600 rounded-full w-6 h-6 text-white text-sm flex items-center justify-center"
                    }
                >
                    {cartCount}
                </span>
            )}
        </button>
    );
}

export default CartIcon;
