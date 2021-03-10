import "../styles/globals.css";
import Header from "../ui/Header";
import Minicart from "../browser-components/Minicart";
import { BrowserComponent } from "~/modfed/BrowserComponent";
import { initializeApollo } from "~/lib/apollo";
import globalQuery from "~/queries/global.graphql";
import { global, global_menu, globalVariables, global_storeConfig } from "~/queries/__generated__/global";
import App, { AppContext, AppProps } from "next/app";
import Nav from "~/browser-components/Nav";

type Props = {
    menu: global_menu | null;
    storeConfig: global_storeConfig | null;
};

function MyApp({ Component, pageProps, menu, storeConfig }: AppProps & Props) {
    return (
        <>
            <Header />
            <BrowserComponent turboPermanent>
                <Minicart />
            </BrowserComponent>
            <BrowserComponent turboPermanent>
                <Nav menu={menu} storeConfig={storeConfig} />
            </BrowserComponent>
            <main className="my-8">
                <turbo-frame id="messages" target="_top">
                    <div className="container mx-auto px-6">
                        <Component {...pageProps} />
                    </div>
                </turbo-frame>
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

MyApp.getInitialProps = async (context: AppContext) => {
    const appProps = await App.getInitialProps(context);
    const client = initializeApollo({}, context as any);
    const res = await client.query<global, globalVariables>({
        query: globalQuery,
        variables: { id: 2 },
    });
    return {
        ...appProps,
        menu: res.data.menu,
        storeConfig: res.data.storeConfig,
    };
};

export default MyApp;
