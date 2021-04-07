import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { Qty } from "~/ui/Qty";
import { ATC } from "~/ui/ATC";
import { useCartService } from "~/modfed/features/cart.dom";
import { useCartAddService } from "~/modfed/features/cart-add.dom";

type Props = {
    sku: string;
};

export function ActionsInner(props: Props) {
    const [qty, setQty] = useState(1);
    const [{ context: cartContext }] = useCartService();
    const [state, sendAdd] = useCartAddService();
    const pending = ["waitingForCartId", "adding"].some(state.matches);
    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (qty > 0) {
                console.log("Adding above", qty, props.sku);
                sendAdd({ type: "cart-add:simple", payload: { sku: props.sku, qty } });
            } else {
                console.log("not adding as below 1");
            }
        },
        [props.sku, qty]
    );
    return (
        <form onSubmit={onSubmit}>
            <fieldset>
                <Qty
                    dec={() => setQty((qty) => (qty > 2 ? qty - 1 : 1))}
                    inc={() => setQty((qty) => qty + 1)}
                    qty={qty}
                    onChange={(val) => setQty(val)}
                />

                {/*<Options />*/}
                <ATC>
                    {pending ? "wait..." : "Add to Cart"} ({cartContext.items_count})
                </ATC>
            </fieldset>
        </form>
    );
}

export function Actions(props: PropsWithChildren<any>) {
    const [ready, setReady] = useState(false);
    useEffect(() => {
        setReady(true);
    }, []);
    return ready ? <ActionsInner {...props} /> : (null as any);
}

export default Actions;
