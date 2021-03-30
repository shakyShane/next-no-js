const webpack = require("webpack");
const { join } = require("path");
const { ESBuildPlugin } = require("esbuild-loader");

const mode = process.env.NODE_ENV || "production";
const outputName = mode === "production" ? "[name].[contenthash].js" : "[name].js";
const publicPath = mode === "production" ? "/_next/static/chunks/modfed/" : "http://localhost:8080/webpack";
const outputDir = mode === "production" ? join(__dirname, ".next/static/chunks/modfed") : "/webpack";

const output = {
    filename: outputName,
    chunkFilename: outputName,
    path: outputDir,
    publicPath: publicPath,
};

const alias = {
    react: "preact/compat",
    "react-dom": "preact/compat",
    "~": __dirname,
};

const esbuild = {
    rules: [
        {
            test: /\.[tj]sx?$/,
            use: [
                {
                    loader: "esbuild-loader",
                    options: {
                        loader: "tsx", // Or 'ts' if you don't need tsx
                        target: "es2017",
                    },
                },
            ],
        },
    ],
};

module.exports = () => {
    return [
        {
            name: "modfed-entry",
            entry: {
                bootstrap: "./modfed/bootstrap",
            },
            output: output,
            module: esbuild,
            devtool: "source-map",
            mode,
            resolve: {
                extensions: [".ts", ".tsx", ".js", ".json"],
                alias: alias,
            },
            stats: {},
            plugins: [
                new webpack.DefinePlugin({
                    "process.env.TURBO_LINKS": Boolean(process.env.TURBO_LINKS),
                }),
                // new webpack.container.ModuleFederationPlugin({
                //     name: "modfed-entry",
                //     // List of remotes with URLs
                //     // remotes: remotes,
                //
                //     // list of shared modules from shell
                //     shared: {
                //         react: { singleton: true },
                //         "react-dom": { singleton: true },
                //     },
                // }),
            ],
        },
    ];
};
