import React, { PropsWithChildren, useState } from "react";
import { useCallback, useRef } from "react";
import { CartEvents } from "../modfed/features/cart.types";

interface Props {
    sku: string;
}

export function AddToCart(props: PropsWithChildren<Props>) {
    const { children, ...rest } = props;
    const ref = useRef<HTMLButtonElement>(null);
    const [disabled, setDisabled] = useState(false);
    const onClick = useCallback(() => {
        const event = new CustomEvent<CartEvents>("@machine.cart", {
            bubbles: true,
            detail: { type: "cart:add", payload: { sku: props.sku, qty: 1 } },
        });
        ref.current.dispatchEvent(event);
        setDisabled(true);
        setTimeout(() => {
            setDisabled(false);
        }, 1000);
    }, []);
    return (
        <div className={"absolute right-0 bottom-4"}>
            <script
                type={"text/json"}
                dangerouslySetInnerHTML={{ __html: JSON.stringify(rest).replace(/</g, "\\u003c") }}
                data-modfed-data
            />
            <button
                className="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                ref={ref}
                onClick={onClick}
                type="button"
                disabled={disabled}
                data-modfed-type="preact"
                data-modfed-component="AddToCart"
                data-modfed-self
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
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
            </button>
        </div>
    );
}

export default AddToCart;
