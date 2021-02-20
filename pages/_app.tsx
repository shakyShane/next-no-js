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
        </>
    );
}

export default MyApp;
