import React, { useCallback, useEffect, useState } from "react";
import { appListen, appSend } from "~/modfed/features/app.types";
import { global_menu, global_storeConfig } from "~/queries/__generated__/global";

type Props = {
    menu: global_menu | null;
    storeConfig: global_storeConfig | null;
};

export function Nav(props: Props) {
    const { storeConfig, menu } = props;
    const [open, setOpen] = useState(false);
    const baseClasses =
        "z-10 fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transform overflow-y-auto bg-white border-l-2 border-gray-300";
    const posClasses = open ? "translate-x-0 ease-out transition duration-300" : "translate-x-full ease-in";
    useEffect(() => {
        const unlisten = appListen((state) => {
            setOpen(state.open);
        });
        return () => {
            unlisten();
        };
    }, []);
    const close = useCallback(() => {
        appSend({ type: "nav:close" });
    }, []);
    return (
        <div className={baseClasses + " " + posClasses}>
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-medium text-gray-700">Main Menu</h3>
                <button className="text-gray-600 focus:outline-none" onClick={close}>
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
            <div className="mt-6">
                <ul>
                    {menu?.children?.map((child) => {
                        let link = "/default/" + child?.url_key;
                        if (storeConfig?.category_url_suffix) {
                            link += storeConfig?.category_url_suffix;
                        }
                        return (
                            <li key={child?.id}>
                                <a href={link}>{child?.name}</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Nav;
