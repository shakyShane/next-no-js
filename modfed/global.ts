import { machine as cartMachine } from "./features/cart";
import { interpret } from "xstate";
import { CartEvents } from "./features/cart.types";
const cartService = interpret(cartMachine)
    .onTransition((t) => {
        console.log(t);
    })
    .start();
export function global() {
    document.addEventListener("@machine.cart", (evt: CustomEvent<CartEvents>) => {
        cartService.send(evt.detail);
    });
}
