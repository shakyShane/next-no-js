import { Heros } from "../ui/Heros";
import { GetServerSideProps } from "next";

interface Props {}

export default function Home() {
    return (
        <>
            <Heros />
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
    unstable_runtimeJS: process.env.NODE_ENV === "development",
};
