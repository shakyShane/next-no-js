console.log("NODE_ENV", process.env.NODE_ENV);
console.log("TURBO_LINKS", process.env.TURBO_LINKS);
if (process.env.TURBO_LINKS) {
    import("./init-prod");
} else {
    import("./init");
}
export {};
