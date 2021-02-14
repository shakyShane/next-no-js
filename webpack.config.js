const webpack = require("webpack");
const {join} = require("path");
const {ESBuildPlugin} = require("esbuild-loader");

const outputDir = join(__dirname, ".next/static/chunks/modfed");
const publicPath = "/_next/static/chunks/modfed/";
const mode = "production";

const output = {
    filename: "[name].js",
    path: outputDir,
    publicPath: publicPath,
};

const alias = {
    "react": "preact/compat",
    "react-dom": "preact/compat",
}

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
    return [{
        name: "modfed-entry",
        entry: {
            bootstrap: "./components/bootstrap",
        },
        output: output,
        module: esbuild,
        devtool: 'source-map',
        mode,
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"],
            alias: alias
        },
        plugins: [
            new ESBuildPlugin(),
            new webpack.container.ModuleFederationPlugin({
                name: 'modfed-entry',
                // List of remotes with URLs
                // remotes: remotes,

                // list of shared modules from shell
                shared: ['react', 'react-dom'],
            })
        ]
    },
        {

            entry: {},
            module: esbuild,
            mode,
            devtool: 'source-map',
            output: output,
            resolve: {
                extensions: [".ts", ".tsx", ".js", ".json"],
                alias: alias
            },
            plugins: [
                new ESBuildPlugin(),
                new webpack.container.ModuleFederationPlugin({
                    name: 'counter',
                    exposes: {
                        ".": './components/Counter',
                    },
                    // list of shared modules from shell
                    shared: {
                        react: { import: false },
                        "react-dom": { import: false }
                    },
                })
            ]
        }]
}