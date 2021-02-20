import "../styles/globals.css";
import Header from "../ui/Header";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Header />
            <main className="my-8">
                <div className="container mx-auto px-6">
                    <Component {...pageProps} />
                </div>
            </main>
            <footer className="bg-gray-200">
                <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <a href="#" className="text-xl font-bold text-gray-500 hover:text-gray-400">
                        Brand
                    </a>
                    <p className="py-2 text-gray-500 sm:py-0">All rights reserved</p>
                </div>
            </footer>
        </>
    );
}

export default MyApp;
