module.exports = {
    // prettier-ignore
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./ui/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {
            opacity: ["disabled"],
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
