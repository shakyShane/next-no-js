import { GetServerSideProps } from "next";
import invariant from "tiny-invariant";
import { initializeApollo } from "~/lib/apollo";
import {
    productDetail,
    productDetail_productDetail_items,
    productDetailVariables,
} from "~/queries/__generated__/productDetail";
import productDetailQuery from "~/queries/productDetail.graphql";
import { Qty } from "~/browser-components/Qty";
import { Options } from "~/browser-components/Options";
import { ATC } from "~/browser-components/ATC";
import { BrowserComponent } from "~/modfed/BrowserComponent";

interface Props {
    product: productDetail_productDetail_items;
}

export default function PDP(props: Props) {
    const { product } = props;
    const { pathname } = new URL(product.image?.url || "");
    const search = "?auto=webp&format=pjpg&width=640&height=800&fit=cover";
    const image = pathname + search;
    return (
        <div className="md:flex md:items-center">
            <div className="w-full h-64 md:w-1/2 lg:h-96">
                <img
                    className="h-full w-full rounded-md object-cover max-w-lg mx-auto"
                    // src={product.image?.url || "https://placehold.it/600"}
                    src={image}
                    alt={product.image?.label || ""}
                />
            </div>
            <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
                <h3 className="text-gray-700 uppercase text-lg">{product.name}</h3>
                <span className="text-gray-500 mt-3">${product.price_range?.minimum_price?.regular_price?.value}</span>
                <hr className="my-3" />
                <BrowserComponent>
                    <Qty />
                    {/*<Options />*/}
                    <ATC />
                </BrowserComponent>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    invariant(typeof context.query.id === "number", "expected an id ");
    invariant(typeof context.query.pathname === "string", "expected a string as the pathname");
    const urlKey = context.query.pathname.split("/");
    const last = urlKey[urlKey.length - 1];
    const withoutExtension = last.replace(/\.html$/, "");

    const client = initializeApollo({}, context);
    const res = await client.query<productDetail, productDetailVariables>({
        query: productDetailQuery,
        variables: { urlKey: withoutExtension },
    });

    const item = res.data.productDetail?.items?.[0];
    invariant(item, "should access first product item");

    return {
        props: {
            product: item,
        },
    };
};

export const config = {
    unstable_runtimeJS: false,
};
