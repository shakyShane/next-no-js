const webpack = require("webpack");
const {join} = require("path");
const {ESBuildPlugin} = require("esbuild-loader");

const output = join(__dirname, ".next/static/chunks/modfed");

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
            main: "./components/entry.js",
        },
        output: {
            filename: "[name].js",
            path: output,
            publicPath: "/",
        },
        module: esbuild,
        devtool: 'source-map',
        mode: 'development',
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
            mode: 'development',
            devtool: 'source-map',
            output: {
                filename: "[name].js",
                path: output,
                publicPath: "/",
            },
            plugins: [
                new ESBuildPlugin(),
                new webpack.container.ModuleFederationPlugin({
                    name: 'counter',
                    exposes: {
                        ".": './components/Counter',
                    },
                    // list of shared modules from shell
                    shared: ['react', 'react-dom'],
                })
            ]
        }]
}