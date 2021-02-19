const webpack = require("webpack");
const deps = require("./package.json").dependencies;
const { join } = require("path");
const { ESBuildPlugin } = require("esbuild-loader");

const outputDir = join(__dirname, ".next/static/chunks/modfed");
const publicPath = "/_next/static/chunks/modfed/";
const mode = "production";

const output = {
    filename: "[name].js",
    chunkFilename: "[name].js",
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
            name: "modfed-preact-init",
            entry: {},
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
                    name: "modfedCounter",
                    exposes: {
                        ".": "./components/Counter",
                    },
                    shared: {
                        react: { import: false },
                        "react-dom": { import: false },
                    },
                }),
                new webpack.container.ModuleFederationPlugin({
                    name: "modfedGallery",
                    exposes: {
                        ".": "./components/Gallery",
                    },
                    shared: {
                        react: { import: false },
                        "react-dom": { import: false },
                    },
                }),
            ],
        },
    ];
};
