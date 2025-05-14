/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./resources/js/**/*.{js,jsx}",
        "./resources/views/**/*.blade.php",
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
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
            borderWidth: {
                0.5: "0.5px", // نازک بارډر 0.5px
            },
            fontFamily: {
                bahij: ["BahijZarBold", "sans-serif"],
            },

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
    plugins: [
        function ({ addComponents }) {
            addComponents({
                ".rtl": {
                    direction: "rtl",
                    textAlign: "right",
                },
                ".rtl .space-x-4 > :not([hidden]) ~ :not([hidden])": {
                    "--tw-space-x-reverse": "1",
                },
                ".rtl .space-x-reverse > :not([hidden]) ~ :not([hidden])": {
                    "--tw-space-x-reverse": "0",
                },
                ".rtl input, .rtl textarea": {
                    textAlign: "right",
                },
                ".rtl table": {
                    textAlign: "right",
                },
                ".rtl ul, .rtl ol": {
                    paddingRight: "1.5rem",
                    paddingLeft: "0",
                },
                ".rtl .flex-row": {
                    flexDirection: "row-reverse",
                },
                ".rtl .mr-1": {
                    marginLeft: "0.25rem",
                    marginRight: "0",
                },
                ".rtl .mr-2": {
                    marginLeft: "0.5rem",
                    marginRight: "0",
                },
                ".rtl .mr-3": {
                    marginLeft: "0.75rem",
                    marginRight: "0",
                },
                ".rtl .mr-4": {
                    marginLeft: "1rem",
                    marginRight: "0",
                },
                ".rtl .ml-1": {
                    marginRight: "0.25rem",
                    marginLeft: "0",
                },
                ".rtl .ml-2": {
                    marginRight: "0.5rem",
                    marginLeft: "0",
                },
                ".rtl .ml-3": {
                    marginRight: "0.75rem",
                    marginLeft: "0",
                },
                ".rtl .ml-4": {
                    marginRight: "1rem",
                    marginLeft: "0",
                },
                ".rtl .pr-1": {
                    paddingLeft: "0.25rem",
                    paddingRight: "0",
                },
                ".rtl .pr-2": {
                    paddingLeft: "0.5rem",
                    paddingRight: "0",
                },
                ".rtl .pr-3": {
                    paddingLeft: "0.75rem",
                    paddingRight: "0",
                },
                ".rtl .pr-4": {
                    paddingLeft: "1rem",
                    paddingRight: "0",
                },
                ".rtl .pl-1": {
                    paddingRight: "0.25rem",
                    paddingLeft: "0",
                },
                ".rtl .pl-2": {
                    paddingRight: "0.5rem",
                    paddingLeft: "0",
                },
                ".rtl .pl-3": {
                    paddingRight: "0.75rem",
                    paddingLeft: "0",
                },
                ".rtl .pl-4": {
                    paddingRight: "1rem",
                    paddingLeft: "0",
                },
                ".rtl .rounded-l": {
                    borderRadius: "0 0.25rem 0.25rem 0",
                },
                ".rtl .rounded-r": {
                    borderRadius: "0.25rem 0 0 0.25rem",
                },
                ".rtl .icon": {
                    transform: "scaleX(-1)",
                },
                ".rtl .dropdown-menu": {
                    right: "auto",
                    left: "0",
                },
            });
        },
    ],
};
