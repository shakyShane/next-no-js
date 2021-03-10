import { IncomingMessage, ServerResponse } from "http";

import { useMemo } from "react";
import {
    ApolloClient,
    defaultDataIdFromObject,
    HttpLink,
    InMemoryCache,
    NormalizedCacheObject,
    ApolloLink,
} from "@apollo/client";

import possibleTypes from "../queries/__global_generated__/possibleTypes.json";

/**
 * Polyfill Global Variables in Server
 */
if (!(process as any).browser) {
    global.URL = require("url").URL;
}

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export type ResolverContext = {
    req?: IncomingMessage;
    res?: ServerResponse;
};

function createIsomorphLink() {
    const url = (process as any).browser
        ? new URL("/graphql", location.href)
        : new URL("/graphql", (process as any).env.BACKEND_URL);

    return new HttpLink({
        uri: url.href,
        credentials: "include",
        useGETForQueries: true,
    });
}

export function createApolloClient(context?: ResolverContext) {
    const httpLink = createIsomorphLink();

    const links: ApolloLink[] = [];

    if (typeof window === "undefined" && context && context.res) {
        // links.push(concatHeaders(context.res));
    }

    return new ApolloClient({
        ssrMode: !(process as any).browser,
        cache: new InMemoryCache({
            dataIdFromObject: (object: any) => {
                switch (object.__typename) {
                    case "EntityUrl":
                        return `${object.type}-${object.id}`;
                    default:
                        return defaultDataIdFromObject(object);
                }
            },
            possibleTypes,
        }),
        link: ApolloLink.from([...links, httpLink]),
    });
}

export function initializeApollo(
    initialState: Record<string, any>,
    // Pages with Next.js data fetching methods, like `getStaticProps`, can send
    // a custom context which will be used by `SchemaLink` to server render pages
    context?: ResolverContext
) {
    const _apolloClient = apolloClient ?? createApolloClient(context);

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // get hydrated here
    if (Object.keys(initialState).length > 0) {
        _apolloClient.cache.restore(initialState);
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function useApollo(initialState: any) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
}
