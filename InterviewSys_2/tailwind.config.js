// tailwind.config.mjs
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                custom: ["CustomFont", "sans-serif"],
            },
        },
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: "#006cff",

                    secondary: "#009bff",

                    accent: "#008499",

                    neutral: "#021817",

                    "base-100": "#292929",

                    info: "#0083d2",

                    success: "#00fa9b",

                    warning: "#ff6700",

                    error: "#fb3560",
                },
            },
        ],
    },
    plugins: [daisyui],
};
