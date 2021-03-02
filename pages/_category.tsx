import { Item } from "~/browser-components/Item";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { categoryList, categoryList_categoryList, categoryListVariables } from "~/queries/__generated__/categoryList";
import categoryListQuery from "~/queries/categoryList.graphql";
import { initializeApollo } from "~/lib/apollo";

interface Props {
    category: categoryList_categoryList;
    products: categoryList_categoryList["products"];
}

export default function Category(props: Props) {
    const { children: childrenProducts, products } = props.category;
    return (
        <>
            <Head>{/*<link rel="preload" href={products[0].image} as="image" />*/}</Head>
            <h3 className="text-gray-700 text-2xl font-medium">{props.category.name}</h3>
            <span className="mt-3 text-sm text-gray-500">{props.products.items.length} Products</span>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                {props.products.items.map((prod, index) => {
                    return (
                        <Item
                            item={{
                                image: prod.image.url,
                                name: prod.name,
                                price: String(prod.price_range.minimum_price.regular_price.value),
                                sku: prod.sku,
                            }}
                            index={index}
                            key={index}
                        />
                    );
                })}
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const { query } = context;
    const client = initializeApollo(null, context);
    const output = {};
    const res = await client.query<categoryList, categoryListVariables>({
        query: categoryListQuery,
        variables: { id: 2 },
    });

    return {
        props: {
            category: res.data.categoryList,
            products: res.data.categoryList.products,
        },
    };
};

export const config = {
    unstable_runtimeJS: false,
};
