import { gql } from "@apollo/client";

import { initializeApollo } from "./apollo";

const known = {
    // "/": "/",
};

async function resolver(pathname, client = initializeApollo({})) {
    pathname = pathname.replace(/^\/default/, "");
    if (known[pathname]) {
        return { newUrl: known[pathname], parsedDestination: { query: {} } };
    }

    const { data } = await client.query({
        query: gql`
            query urlResolver($urlKey: String = "/designers") {
                urlResolver(url: $urlKey) {
                    type
                    id
                    redirectCode
                    relative_url
                }
            }
        `,
        variables: { urlKey: pathname },
    });

    if (!data.urlResolver) {
        console.error("missing data.urlResolver", data, pathname);
        return undefined;
    }

    if (!data.urlResolver.type) {
        console.error("missing data.urlResolver.type", data, pathname);
        return undefined;
    }

    const output = {
        newUrl: `/_${data.urlResolver.type.toLowerCase()}`,
        parsedDestination: {
            pathname: pathname,
            query: {
                id: data.urlResolver.id,
                pathname: pathname,
            },
            hash: "",
            href: pathname,
        },
    };
    return output;
}

export default resolver;
