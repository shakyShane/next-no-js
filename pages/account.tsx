export function Account() {
    return (
        <div>
            <h1>Hi, you're now logged in!</h1>
        </div>
    );
}

export default Account;

export const config = {
    unstable_runtimeJS: process.env.NODE_ENV === "development",
};
