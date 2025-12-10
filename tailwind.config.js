/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Roboto', 'sans-serif'],
                bangers: ['Bangers', 'cursive'],
            },
            colors: {
                marvel: {
                    red: '#ed1d24',
                }
            },
            backgroundImage: {
                'comic-pattern': "radial-gradient(#e5e7eb 15%, transparent 16%), radial-gradient(#e5e7eb 15%, transparent 16%)",
            }
        },
    },
    plugins: [],
}
