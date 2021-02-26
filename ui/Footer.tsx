import { A, ALink } from "./Type";

export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-400 shadow">
            <div className="container max-w-4xl mx-auto flex py-8">
                <div className="w-full mx-auto flex flex-wrap">
                    <div className="flex w-full md:w-1/2 ">
                        <div className="px-8">
                            <h3 className="font-bold text-gray-900">About</h3>
                            <p className="py-4 text-gray-600 text-sm">
                                I spent years trying to delay/remove the hydration of 'inert' DOM in large React apps...
                                It's hard.
                            </p>
                            <p className="pb-4 text-gray-600 text-sm">
                                Now I think content-heavy sites should opt-in to client-side JS on a component level
                                instead. This site is my experiment to see how far I can push the idea of having Next
                                generate the site/HTML, and then have Preact hydrate individual components that have
                                opted-in to client-side JS
                            </p>
                        </div>
                    </div>

                    <div className="flex w-full md:w-1/2">
                        <div className="px-8">
                            <h3 className="font-bold text-gray-900">Social</h3>
                            <ul className="list-reset items-center text-sm pt-3">
                                <li>
                                    <ALink href="https://twitter.com/shaneOsbourne">@shaneOsbourne on Twitter</ALink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
