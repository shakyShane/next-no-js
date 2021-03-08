/// <reference types="next" />
/// <reference types="next/types/global" />

import { HTMLAttributes } from "react";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "turbo-frame": any; // The 'any' just for testing purposes
            "simple-greeting": any; // The 'any' just for testing purposes
        }
    }
}

declare namespace JSX {
    interface IntrinsicElements {
        "turbo-frame": HTMLAttributes;
        "simple-greeting": HTMLAttributes;
    }
}
