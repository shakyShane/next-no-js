import { Item } from "../ui/Item";
import Pagination from "../ui/Pagination";

export default function Home() {
    return (
        <>
            <h3 className="text-gray-700 text-2xl font-medium">Wrist Watch</h3>
            <span className="mt-3 text-sm text-gray-500">200+ Products</span>
            <Item
                item={{
                    image:
                        "https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
                }}
            />
            <Pagination />
        </>
    );
}

export const config = {
    unstable_runtimeJS: process.env.NODE_ENV === "development",
};
