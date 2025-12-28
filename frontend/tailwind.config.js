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
                main: 'var(--bg-main)',
                secondary: 'var(--bg-secondary)',
                glass: {
                    bg: 'var(--glass-bg)',
                    blur: 'var(--glass-blur)',
                    shadow: 'var(--glass-shadow)',
                },
                text: {
                    primary: 'var(--text-primary)',
                    secondary: 'var(--text-secondary)',
                },
                accent: {
                    primary: 'var(--accent-primary)',
                    secondary: 'var(--accent-secondary)',
                },
            },
            fontFamily: {
                sans: ['"Outfit"', 'sans-serif'],
            },
            backgroundImage: {
                'glass-gradient': 'linear-gradient(135deg, var(--glass-bg) 0%, rgba(255,255,255,0.05) 100%)',
            },
        },
    },
    plugins: [],
}
