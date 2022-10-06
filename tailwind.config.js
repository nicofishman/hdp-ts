/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.tsx'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                pink: '#c6187b',
                'light-pink': '#fc58ab'
            },
            fontFamily: {
                card: '"Roboto","Helvetica","Arial",sans-serif;',
                main: 'Oswald, sans-serif'
            },
            fontSize: {
                card: '0.95rem'
            },
            boxShadow: {
                'theme-card': '3.2px 3.2px 4.8px #333',
                'dark-card': '1.6px 1.6px 4.8px #888'
            },
            backgroundColor: {
                negrito: '#121212'
            },
            backgroundImage: {
                logoDark: "url('/src/public/img/logoDark.svg')",
                logoLight: "url('/src/public/img/logoLight.svg')"
            }
        }
    },
    variants: {
        extend: {
            backgroundImage: ['dark']
        }
    },
    plugins: []
};
