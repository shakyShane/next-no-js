const CWD = __dirname;
const { resolve } = require("path");

module.exports = {
    webpack(config) {
        config.module.rules.push({
            test: /\.(graphql|gql)$/,
            loader: "graphql-tag/loader",
        });
        return config;
    },
    rewrites() {
        return [
            /**
             * Rewrite /graphql requests to Magento
             */
            {
                source: "/graphql/:pathname*",
                destination: new URL("graphql", process.env.BACKEND_URL).href,
            },
            {
                source: "/rest/:pathname*",
                destination: new URL("rest", process.env.BACKEND_URL).href,
            },
        ];
    },
    i18n: {
        locales: ["default"],
        defaultLocale: "default",
    },
};
