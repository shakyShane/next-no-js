import { Item } from "../components/Item";
import { products } from "../data/products";
import { GetServerSideProps } from "next";

interface Props {
    category: Category;
}

interface Category {
    name: String;
}

export default function Category(props: Props) {
    return (
        <>
            <h3 className="text-gray-700 text-2xl font-medium">{props.category.name}</h3>
            <span className="mt-3 text-sm text-gray-500">200+ Products</span>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                {products.map((prod, index) => {
                    return <Item item={prod} key={index} />;
                })}
            </div>
            {/*<Pagination />*/}
        </>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    return {
        props: {
            category: {
                name: "Watches",
            },
        },
    };
};

export const config = {
    unstable_runtimeJS: false,
};
