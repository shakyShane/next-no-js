import { global } from "./global";

global();

const elem = document.getElementById("bootstrap");
if (elem) {
    const str = elem.textContent;
    const json = JSON.parse(str);
    console.log(json);
    json.runtimes.forEach((rt) => {
        if (rt === "preact") {
            console.log("woop!");
            import("./init-preact");
        }
        if (rt === "vanilla") {
            import("./init-vanilla");
        }
    });
}
export {};
