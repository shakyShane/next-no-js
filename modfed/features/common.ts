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
