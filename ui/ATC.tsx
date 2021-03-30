import React, { PropsWithChildren } from "react";

type Props = {};

export function ATC(props: PropsWithChildren<Props>) {
    return (
        <div className="flex items-center mt-6">
            <button
                type="submit"
                className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
            >
                {props.children}
            </button>
        </div>
    );
}

export default ATC;
