import React, { PropsWithChildren, useState } from "react";

export function Qty() {
    const [qty, setQty] = useState(1);
    return (
        <div className="mt-2">
            <label className="text-gray-700 text-sm" htmlFor="count">
                Count:
            </label>
            <div className="flex items-center mt-1">
                <Button onClick={() => setQty((qty) => (qty > 2 ? qty - 1 : 1))}>
                    <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </Button>
                <span className="text-gray-700 text-lg mx-2">{qty}</span>
                <Button onClick={() => setQty((qty) => qty + 1)}>
                    <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </Button>
            </div>
        </div>
    );
}

type ButtonProps = {
    onClick();
};
function Button(props: PropsWithChildren<ButtonProps>) {
    return (
        <button className="text-gray-500 focus:outline-none focus:text-gray-600" onClick={props.onClick}>
            <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                {props.children}
            </svg>
        </button>
    );
}

export default Qty;
