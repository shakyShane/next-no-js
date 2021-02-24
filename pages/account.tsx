import Link from "next/link";

export function Account() {
    return (
        <div>
            <h1>Hi, you're now logged in!</h1>
            <p>
                <Link href={"/"}>Back home</Link>
            </p>
        </div>
    );
}

export default Account;

export const config = {
    unstable_runtimeJS: process.env.NODE_ENV === "development",
};
