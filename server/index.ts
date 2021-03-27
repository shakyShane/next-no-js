import { parse } from "url";
import { join } from "path";

import next from "next";
import express from "express";

import resolver from "../lib/magento-url-resolver";
import { createApolloClient } from "../lib/apollo";
import { createProxyMiddleware } from "http-proxy-middleware";

const apiPaths = {
    "/media": {
        target: "https://venia.magento.com",
        pathRewrite: {
            "^/media": "/media",
        },
        changeOrigin: true,
    },
};

export function init() {
    const dev = process.env.NODE_ENV !== "production";
    const port = process.env.PORT || 8080;
    const app = next({ dev });
    const handle = app.getRequestHandler();

    const ignore = ["/favicon.ico", "/graphql", "/rest", "/media"];
    app.prepare().then(() => {
        const server = express();

        server.use("/media", createProxyMiddleware(apiPaths["/media"]));
        server.use("/sw.js", express.static(join(".next", "sw.js")));
        server.use("/sw-killswitch.js", express.static(join(".next", "sw-killswitch.js")));

        const localHandle = async (req, res, next) => {
            // Be sure to pass `true` as the second argument to `url.parse`.
            // This tells it to parse the query portion of the URL.
            const parsedUrl = parse(req.url, true);

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { pathname, query } = parsedUrl;

            if (
                pathname?.startsWith("/_next") ||
                pathname?.startsWith("/__nextjs") ||
                pathname?.startsWith("/webpack")
            ) {
                return next();
            }

            if (ignore.some((ig) => pathname?.indexOf(ig) === 0)) {
                return next();
            }

            // /sofa -> PRODUCT -> _product.tsx
            const client = createApolloClient({ res });
            const resolvedUrl = await resolver(pathname, client);
            if (resolvedUrl) {
                if (dev) {
                    // eslint-disable-next-line no-console
                    console.log("urlResolver", resolvedUrl);
                }
                await app.render(req, res, resolvedUrl.newUrl, resolvedUrl.parsedDestination.query || {});
            } else {
                return next();
            }
        };

        server.all("*", [
            localHandle,
            (req, res) => {
                return handle(req, res);
            },
        ]);

        server.on("error", (e) => {
            console.error("could not listen", e);
        });
        server.listen(port, () => {
            // eslint-disable-next-line no-console
            console.log(`> Ready on http://localhost:${port}`);
        });
    });
}

if (require.main === module) {
    init();
}
