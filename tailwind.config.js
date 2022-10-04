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
                'theme-card': '0.2em 0.2em 0.3em #333',
                'dark-card': '0.1em 0.1em 0.3em #888'
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
