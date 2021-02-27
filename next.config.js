const rehypePrism = require("rehype-highlight");
const withMDX = require("@next/mdx")({
    options: {
        remarkPlugins: [],
        rehypePlugins: [rehypePrism],
    },
});
module.exports = withMDX({
    pageExtensions: ["js", "jsx", "tsx", "mdx"],
    async redirects() {
        return [
            {
                source: "/with-js",
                destination: "/examples/with-js",
                permanent: true,
            },
            {
                source: "/with-data",
                destination: "/examples/with-data",
                permanent: true,
            },
            {
                source: "/vanilla-js",
                destination: "/examples/vanilla-js",
                permanent: true,
            },
        ];
    },
});
