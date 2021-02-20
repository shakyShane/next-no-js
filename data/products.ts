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
        image:
            "https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    },
    {
        sku: "456",
        price: "99.99",
        name: "Old Watch",
        image:
            "https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    },
    {
        sku: "78993",
        price: "57.99",
        name: "Fossil Watch",
        image:
            "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    },
];
