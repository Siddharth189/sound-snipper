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
        }
    },
  },
  plugins: [],
}
