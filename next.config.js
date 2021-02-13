const { ModuleFederationPlugin } = require("webpack").container;
module.exports = {
    webpack: (config, two, three, four) => {
        // const oldEntry = config.entry;
        // config.entry = async (arg1, arg2, arg3) => {
        //     let out = await oldEntry();
        //     out.modfed = './components/entry'
        //     return out;
        // }
        // config.plugins.push(
        //     new ModuleFederationPlugin({
        //         filename: `modfed-entry`,
        //         name: 'entry',
        //         // List of remotes with URLs
        //         shared: [
        //             "react",
        //             "react-dom"
        //         ]
        //     })
        // )
        return config;
    }
}