const webpack = require("webpack");
const { join } = require("path");
const { ESBuildPlugin } = require("esbuild-loader");

const outputDir = join(__dirname, ".next/static/chunks/modfed");
const publicPath = "/_next/static/chunks/modfed/";
const mode = "development";

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
            externals: {
                uiLib: `promise fetch("/api/hello").then(x=>x.json())`,
            },
            plugins: [
                new ESBuildPlugin(),
                new webpack.container.ModuleFederationPlugin({
                    name: "modfed-entry",
                    // List of remotes with URLs
                    remotes: {
                        uiLib: "uiLib@uiLib",
                    },

                    // list of shared modules from shell
                    shared: ["react", "react-dom"],
                }),
                // new webpack.container.ModuleFederationPlugin({
                //     name: "uiLib",
                //     // List of remotes with URLs
                //     // remotes: remotes,
                //     // exposes: {
                //     //     "./Counter": "./components/Counter",
                //     // },
                //     shared: {
                //         react: { import: false },
                //         "react-dom": { import: false },
                //     },
                // }),
            ],
        },
    ];
};
