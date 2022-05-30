module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-custom': '#166bb6a',
      },
    },
  },
  plugins: [
      require('@tailwindcss/forms'),
  ],
}