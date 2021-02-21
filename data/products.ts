export interface Product {
    sku: string;
    name: string;
    image: string;
    price: string;
}

export const products: Product[] = [
    {
        sku: "0123",
        price: "123.99",
        name: "Classic Watch",
        image: "/watch-1.webp",
    },
    {
        sku: "456",
        price: "99.99",
        name: "Old Watch",
        image: "/watch-2.webp",
    },
    {
        sku: "78993",
        price: "57.99",
        name: "Fossil Watch",
        image: "/watch-3.webp",
    },
];
