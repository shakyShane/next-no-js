import "tailwindcss/tailwind.css";
import { Nav } from "../ui/Nav";
import Link from "next/link";
import { Footer } from "../ui/Footer";
import { HomeLink } from "../ui/Type";

function MyApp({ Component, pageProps, ...rest }) {
    return (
        <>
            <Nav />
            <div className="container w-full md:max-w-3xl mx-auto pt-20 pb-4">
                <div
                    className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal"
                    style={{ fontFamily: "Georgia,serif" }}
                >
                    {rest.router.pathname !== "/" && <HomeLink />}
                    <Component {...pageProps} />
                    <div className="pt-4">{rest.router.pathname !== "/" && <HomeLink />}</div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default MyApp;
