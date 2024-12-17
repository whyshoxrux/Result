/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", 'index.html'],
  theme: {
    extend: {
      container: {
        padding: 75,
        center: true,
      },
      colors: {
        primary: {
          500: "#02897A",
          200: "#EDFFFC",
        },
      }
    },
  },
  plugins: [],
}