const elem = document.getElementById("bootstrap");
if (elem) {
    const str = elem.textContent;
    const json = JSON.parse(str);
    json.runtimes.forEach((rt) => {
        if (rt === "preact") {
            import("./init-preact");
        }
        if (rt === "vanilla") {
            import("./init-vanilla");
        }
    });
}
export {};
