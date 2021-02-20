import Link from "next/link";

export default function Home() {
    return (
        <>
            <h3 className="text-gray-700 text-2xl font-medium">Ecommerce store</h3>
            <p>
                <Link href={"/category"}>Watches</Link>
            </p>
        </>
    );
}

export const config = {
    unstable_runtimeJS: process.env.NODE_ENV === "development",
};
