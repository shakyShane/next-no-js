console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
    import("./init-prod");
} else {
    import("./init");
}
export {};
