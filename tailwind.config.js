/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "search-background": "url(/teste.png)",
            },
            colors: {
                primary: "#B08D57",        // dourado principal
                secondary: "#312A4F",      // roxo escuro
                primaryLighter: "#D6B97A", // dourado claro
                grayPrimary: "#7A7A7A",
                primaryDarker: "#6E562F",  // dourado fechado
                grayLighter: "#C2C4C5",
                whitePrimary: "#F5F5F5",
            },
            textColor: {
                dark: "#6F6F6F",
            },
            fontFamily: {
                cursive: ['"Dancing Script"', 'cursive'],
            },
        },
    },
    plugins: [],
};
