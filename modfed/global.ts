export function global() {
    console.log("adding global listeners");
    document.addEventListener("add-to-cart", (evt) => {
        console.log("got add-to-cart", evt);
    });
}
