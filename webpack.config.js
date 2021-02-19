const webpack = require("webpack");
const { join } = require("path");
const { ESBuildPlugin } = require("esbuild-loader");

const outputDir = join(__dirname, ".next/static/chunks/modfed");
const publicPath = "/_next/static/chunks/modfed/";
const mode = process.env.BUILD_ENV || "production";

const output = {
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
    path: outputDir,
    publicPath: publicPath,
};

const alias = {
    react: "preact/compat",
    "react-dom": "preact/compat",
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
                new ESBuildPlugin(),
                new webpack.container.ModuleFederationPlugin({
                    name: "modfed-entry",

                    // list of shared modules from shell
                    shared: {
                        react: {
                            import: "react", // the "react" package will be used a provided and fallback module
                            shareKey: "react", // under this name the shared module will be placed in the share scope
                            shareScope: "default", // share scope with this name will be used
                            singleton: true, // only a single version of the shared module is allowed
                        },
                        "react-dom": {
                            singleton: true, // only a single version of the shared module is allowed
                        },
                    }
                }),
                new webpack.container.ModuleFederationPlugin({
                    name: "counter",
                    filename: "modfed-[name].[contenthash].js",
                    exposes: {
                        ".": "./components/Counter",
                    },
                    // list of shared modules from shell
                    shared: {
                        react: { import: false },
                        "react-dom": { import: false },
                    },
                }),
                new webpack.container.ModuleFederationPlugin({
                    name: "counterVanilla",
                    filename: "modfed-[name].[contenthash].js",
                    exposes: {
                        ".": "./components/counter-runtime",
                    },
                    // list of shared modules from shell
                    shared: {
                        react: { import: false },
                        "react-dom": { import: false },
                    },
                }),
            ],
        },
    ];
};
