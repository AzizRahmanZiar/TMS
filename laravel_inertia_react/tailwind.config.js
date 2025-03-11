/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,jsx}",
        "./components/**/*.{js,jsx}",
        "./**/*.{js,jsx}",
        "*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                primary: {
                    50: "#f7f7f8",
                    100: "#efeef1",
                    200: "#d8d6dd",
                    300: "#b7b3bf",
                    400: "#918899",
                    500: "#736878",
                    600: "#5d5361",
                    700: "#4d444f",
                    800: "#423b44",
                    900: "#3a343b",
                    950: "#1a171b",
                },
                secondary: {
                    50: "#fbf7f4",
                    100: "#f5ebe4",
                    200: "#ead5c7",
                    300: "#ddb89f",
                    400: "#cd9474",
                    500: "#c17a55",
                    600: "#b36447",
                    700: "#954e3b",
                    800: "#7a4234",
                    900: "#65382f",
                    950: "#351b16",
                },
                tertiary: {
                    50: "#f6f6f4",
                    100: "#e7e6e2",
                    200: "#d3d1c8",
                    300: "#b5b2a5",
                    400: "#989181",
                    500: "#827867",
                    600: "#6d6354",
                    700: "#5b5246",
                    800: "#4d463d",
                    900: "#423d36",
                    950: "#272320",
                },
            },
        },
    },
    plugins: [],
};
