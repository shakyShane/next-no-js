import React from "react";
import { appSend } from "~/modfed/features/app.dom";

export function MenuItem() {
    return (
        <button
            type="button"
            className="text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-500"
            aria-label="toggle menu"
            onClick={() => appSend({ type: "nav:open" })}
        >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
            </svg>
        </button>
    );
}

export default MenuItem;
