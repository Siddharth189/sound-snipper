/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,css}"],
  theme: {
    extend: {
        colors: {
            "dark": {
                "bg": "#121212",
                "accent": "#1f1f1f",
            },
            "blue": {
                "d": "#0027b3",
                "l": "#00bcd4"
            },
            "red": {
                "custom": "#b32b00"
            },
            "grey": {
                "custom": "#D9D9D9"
            },
            gr: {
                1: '#fc4a1a',
                2: '#f69431'
            }
        },
        fontFamily: {
            "nunito": "Nunito, sans-serif"
        },
        animation: {
            dash: "dash 1.5s ease-in-out infinite",
            spin: "spin 1.5s linear infinite",
            gradient: 'gradient 4s linear infinite'
        },
        keyframes: {
            dash: {
                '0%': {
                    'stroke-dasharray': '1, 200',
                    'stroke-dashoffset': 0
                },
                '50%': {
                    'stroke-dasharray': '89, 200',
                    'stroke-dashoffset': '-35px'
                },
                '100%': {
                    'stroke-dasharray': '89, 200',
                    'stroke-dashoffset': '-124px'
                }
            },
            gradient: {
                '0%, 100%': {
                    'background-position': '0% 50%',
                    'background-size': '200%'
                },
                '50%': {
                    'background-position': '100% 50%',
                    'background-size': '200%'
                }
            },
        }
    },
  },
  plugins: [],
}
