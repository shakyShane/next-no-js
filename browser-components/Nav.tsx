import React, { PropsWithChildren } from "react";
import { global_menu } from "~/queries/__generated__/global";
import { useAppService } from "~/modfed/features/app.dom";

type Props = {
    menu: global_menu | null;
};

export function Nav(props: Props) {
    const { menu } = props;
    const [{ value }, send] = useAppService();
    const baseClasses =
        "z-10 fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transform overflow-y-auto bg-white border-l-2 border-gray-300";
    const posClasses = value === "open" ? "translate-x-0 ease-out transition duration-300" : "translate-x-full ease-in";
    return (
        <div className={baseClasses + " " + posClasses}>
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-medium text-gray-700">Main Menu</h3>
                <button className="text-gray-600 focus:outline-none" onClick={() => send({ type: "nav:close" })}>
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <hr className="my-3" />
            <div className="mt-6">{menu?.children && <NavItems items={menu.children} level={0} />}</div>
        </div>
    );
}

type ItemProps = {
    name: string | null;
    url_key: string | null;
    url_path: string | null;
    url_suffix: string | null;
    id: number | null;
    children?: (ItemProps | null)[] | null;
};

function NavItems<I extends ItemProps>(props: PropsWithChildren<{ items: (I | null)[]; level: number }>) {
    if (props.items.length === 0) return null;
    return (
        <ul className={props.level === 1 ? "pl-4" : ""}>
            {props.items.map((item) => {
                if (!item) return null;
                let link = "/default/" + item.url_path;
                if (item.url_suffix) {
                    link += item.url_suffix;
                }
                return (
                    <li key={item.id}>
                        <p>
                            <a href={link}>{item.name}</a>
                        </p>
                        {Array.isArray(item.children) && item.children.length > 0 && (
                            <NavItems items={item.children} level={props.level + 1} />
                        )}
                    </li>
                );
            })}
        </ul>
    );
}

export default Nav;
