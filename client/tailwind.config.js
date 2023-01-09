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
            }
        },
        fontFamily: {
            "nunito": "Nunito, sans-serif"
        },
        animation: {
            'svgfill': "svgfill 0.5s linear forwards",
            dash: "dash 1.5s ease-in-out infinite",
            spin: "spin 1.5s linear infinite"
        },
        keyframes: {
            'svgfill': {
                '0%': {
                    fill: "white",
                    stroke: "#2E3192"
                },
                '100%': {
                    fill: "#2E3192",
                    stroke: "transparent"
                }
            },
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
            }
        }
    },
  },
  plugins: [],
}
