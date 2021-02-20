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
        image: "https://source.unsplash.com/400x280?wrist-watch",
    },
    {
        sku: "456",
        price: "99.99",
        name: "Old Watch",
        image: "https://source.unsplash.com/400x280?watch",
    },
    {
        sku: "78993",
        price: "57.99",
        name: "Fossil Watch",
        image: "https://source.unsplash.com/400x280?gold-watch",
    },
];
