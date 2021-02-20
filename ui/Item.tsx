import { AddToBasket } from "../components/AddToCart";

type Props = {
    item: {
        image: string;
    };
};
export function Item(props: Props) {
    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            <div className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                <div
                    className="flex items-end justify-end h-56 w-full bg-cover"
                    style={{
                        backgroundImage: `url('${encodeURI(props.item.image)}')`,
                    }}
                >
                    <AddToBasket />
                </div>
                <div className="px-5 py-3">
                    <h3 className="text-gray-700 uppercase">Classic watch</h3>
                    <span className="text-gray-500 mt-2">$123</span>
                </div>
            </div>
        </div>
    );
}
