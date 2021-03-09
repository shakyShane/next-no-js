import { Item } from "~/ui/Item";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { categoryList, categoryList_categoryList, categoryListVariables } from "~/queries/__generated__/categoryList";
import categoryListQuery from "~/queries/categoryList.graphql";
import { initializeApollo } from "~/lib/apollo";

interface Props {
    category: categoryList_categoryList;
    products: categoryList_categoryList["products"];
}

const images = [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60",
    "https://images.unsplash.com/photo-1513094735237-8f2714d57c13?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=300&q=60",
    "https://images.unsplash.com/photo-1494354205675-139c8101dfa5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=300&q=30",
];

export default function Category(props: Props) {
    const { children: childrenProducts, products } = props.category;
    return (
        <>
            <Head>{/*<link rel="preload" href={products[0].image} as="image" />*/}</Head>
            <h3 className="text-gray-700 text-2xl font-medium">{props.category.name}</h3>
            <p>
                <span className="mt-3 text-sm text-gray-500">{props.products.items.length} Products</span>
            </p>
            <Link href={"/"}>Home</Link>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                {products.items.slice(0, 3).map((prod, index) => {
                    return (
                        <Item
                            item={{
                                image: images[index],
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
