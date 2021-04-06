import React, { PropsWithChildren } from "react";

type Props = {
    inc();
    dec();
    onChange(val: number);
    qty: number;
};

export function Qty(props: Props) {
    return (
        <div className="mt-2">
            <label className="text-gray-700 text-sm" htmlFor="count">
                Count:
            </label>
            <div className="flex items-center mt-1">
                <Button onClick={props.dec}>
                    <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </Button>
                <input
                    name="qty"
                    className="px-2 border-2 border-gray-200 text-center"
                    type="number"
                    min={1}
                    value={props.qty === -1 ? "" : props.qty}
                    onChange={(e) => {
                        const v = e.target.value;
                        const n = Number(v);
                        if (!Number.isNaN(n) && n > 0) {
                            props.onChange(n);
                        } else {
                            props.onChange(-1);
                        }
                    }}
                />
                <Button onClick={props.inc}>
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
        <button className="text-gray-500 focus:outline-none focus:text-gray-600" onClick={props.onClick} type="button">
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
