/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      body: ["Quicksand_400Regular"]
    },
    extend: {
      colors: {
        'regal-blue': '#003466',
      },

    },
  },
  plugins: [],
}

