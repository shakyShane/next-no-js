import Link from "next/link";
import React from "react";
import { AddToCart } from "./AddToCart";
import { Product } from "../data/products";

type Props = {
    item: Product;
    index: number;
};

export function Item(props: Props) {
    return (
        <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
            <div className="w-full relative">
                <img
                    src={props.item.image}
                    className="w-full block mb-0"
                    loading={props.index === 0 ? "eager" : "lazy"}
                />
                <AddToCart sku={props.item.sku} />
            </div>
            <div className="px-5 py-3">
                <Link href={`/product?sku=${props.item.sku}`}>
                    <a className="text-gray-700 uppercase block hover:underline">{props.item.name}</a>
                </Link>
                <span className="text-gray-500 mt-2">${props.item.price}</span>
            </div>
        </div>
    );
}

export default Item;
