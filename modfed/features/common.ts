import { AppValue, PublicContext, Send } from "~/modfed/features/app.machine";
import { useCallback, useEffect, useState } from "react";
import { GLOBAL_PROXY } from "~/modfed/constants";
import { Interpreter } from "xstate";

export function onEscapeKey(actionObj) {
    return (ctx, evt) => (send, recv) => {
        console.log("+onEscapeKey");
        const listener = (evt: KeyboardEvent) => {
            if (evt.key === "Escape") {
                send(actionObj);
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            console.log("-onEscapeKey");
            document.removeEventListener("keydown", listener);
        };
    };
}

export function onTurboNav(actionObj) {
    return (ctx, evt) => (send, recv) => {
        console.log("+onTurboNav");
        const listener = () => {
            send(actionObj);
        };
        document.addEventListener("turbo:before-visit", listener);
        return () => {
            console.log("-onTurboNav");
            document.removeEventListener("turbo:before-visit", listener);
        };
    };
}

export function compose(fns: any[]) {
    return (ctx, evt) => (send, recv) => {
        console.log("+setup");
        const listeners = fns.map((fn) => fn(ctx, evt)(send));
        return () => {
            console.log("-teardown");
            listeners.forEach((listener) => listener());
        };
    };
}

export function useService(serviceName: string) {
    const [state, setState] = useState(() => {
        if (typeof window === "undefined") {
            return { value: "idle", context: {} };
        }
        if (window[GLOBAL_PROXY][serviceName]) {
            return window[GLOBAL_PROXY][serviceName].initial;
        }
        return { value: "idle", context: {} };
    });
    const send: Send = useCallback((evt) => {
        if (typeof window === "undefined") return;
        if (window[GLOBAL_PROXY][serviceName]) {
            return (window[GLOBAL_PROXY][serviceName] as any).srv.send(evt);
        } else {
            console.log("not found for app:state");
        }
    }, []);
    useEffect(() => {
        let unsub;
        if (typeof window === "undefined") return;
        if (window[GLOBAL_PROXY][serviceName]) {
            unsub = (window[GLOBAL_PROXY][serviceName] as any).srv.subscribe((evt) => {
                setState({ value: evt.value, context: evt.context });
            });
        }
        return unsub;
    }, []);
    return [state, send];
}

export function useSend<T extends Interpreter<any, any, any>>(serviceName: string): T["send"] {
    return useCallback((evt) => {
        if (typeof window === "undefined") return;
        if (window[GLOBAL_PROXY][serviceName]) {
            return (window[GLOBAL_PROXY][serviceName] as any).srv.send(evt);
        } else {
            console.log("not found for %s", serviceName);
        }
    }, []);
}
