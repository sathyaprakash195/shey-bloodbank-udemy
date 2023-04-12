/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors : {
            'primary' : '#802828',
        }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

