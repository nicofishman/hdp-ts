/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.tsx'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                card: '"Roboto","Helvetica","Arial",sans-serif;',
                main: 'Oswald, sans-serif'
            },
            fontSize: {
                card: '0.95rem'
            },
            boxShadow: {
                'theme-card': '0.2em 0.2em 0.3em #333',
                'dark-card': '0.2em 0.2em 0.3em #666'
            },
            backgroundColor: {
                negrito: '#121212'
            }
        }
    },
    plugins: []
};
