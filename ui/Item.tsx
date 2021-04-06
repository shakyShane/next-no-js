import Link from "next/link";
import React from "react";
import { Product } from "~/data/products";

type Props = {
    item: Product;
    index: number;
};

export function Item(props: Props) {
    return (
        <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
            <div className="w-full relative pb-48 overflow-hidden">
                <img
                    src={props.item.image}
                    className="w-full block mb-0 absolute top-0 left-0"
                    loading={props.index === 0 ? "eager" : "lazy"}
                    style={{ outline: "1px dotted black" }}
                />
            </div>
            <div className="px-5 py-3 relative">
                {/*<BrowserComponent className="absolute right-0 bottom-4" id={`CartIcon-${props.item.sku}`}>*/}
                {/*    <AddToCart sku={props.item.sku} />*/}
                {/*</BrowserComponent>*/}
                <Link href={props.item.url} locale={"default"}>
                    <a className="text-gray-700 uppercase block hover:underline">{props.item.name}</a>
                </Link>
                <span className="text-gray-500 mt-2">${props.item.price}</span>
            </div>
        </div>
    );
}

export default Item;
