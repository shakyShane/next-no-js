import { GetServerSideProps } from "next";
import { Product, products } from "../data/products";

interface Props {
    product: Product;
}

export default function PDP(props: Props) {
    return (
        <div className="md:flex md:items-center">
            <div className="w-full h-64 md:w-1/2 lg:h-96">
                <img
                    className="h-full w-full rounded-md object-cover max-w-lg mx-auto"
                    src={props.product.image}
                    alt={props.product.name}
                />
            </div>
            <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
                <h3 className="text-gray-700 uppercase text-lg">{props.product.name}</h3>
                <span className="text-gray-500 mt-3">${props.product.price}</span>
                <hr className="my-3" />
                <div className="mt-2">
                    <label className="text-gray-700 text-sm" htmlFor="count">
                        Count:
                    </label>
                    <div className="flex items-center mt-1">
                        <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </button>
                        <span className="text-gray-700 text-lg mx-2">20</span>
                        <button className="text-gray-500 focus:outline-none focus:text-gray-600">
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="mt-3">
                    <label className="text-gray-700 text-sm" htmlFor="count">
                        Color:
                    </label>
                    <div className="flex items-center mt-1">
                        <button className="h-5 w-5 rounded-full bg-blue-600 border-2 border-blue-200 mr-2 focus:outline-none"></button>
                        <button className="h-5 w-5 rounded-full bg-teal-600 mr-2 focus:outline-none"></button>
                        <button className="h-5 w-5 rounded-full bg-pink-600 mr-2 focus:outline-none"></button>
                    </div>
                </div>
                <div className="flex items-center mt-6">
                    <button className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
                        Order Now
                    </button>
                    <button className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none">
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    let product = products[0];
    if (context.query.sku) {
        product = products.find((p) => p.sku === context.query.sku) || product;
    }
    return {
        props: {
            product,
        },
    };
};

export const config = {
    unstable_runtimeJS: false,
};
