/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                charcoal: "#1A1A1A",
                industrial: "#0056b3",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['"DM Serif Display"', 'serif'],
            },
            letterSpacing: {
                tighter: '-0.05em',
            },
            borderWidth: {
                '10': '0.1px',
            }
        },
    },
    plugins: [],
}
