import Link from "next/link";
import { Heros } from "../ui/Heros";

export default function Home() {
    return (
        <>
            <Heros />
        </>
    );
}

export const config = {
    unstable_runtimeJS: process.env.NODE_ENV === "development",
};
