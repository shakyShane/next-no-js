/// <reference types="next" />
/// <reference types="next/types/global" />

import { HTMLAttributes } from "react";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "turbo-frame": any; // The 'any' just for testing purposes
            "mad-notes": HTMLAttributes & { component: string };
        }
    }
}

declare namespace JSX {
    interface IntrinsicElements {
        "turbo-frame": HTMLAttributes;
        "mad-notes": HTMLAttributes & { component: string };
    }
}
