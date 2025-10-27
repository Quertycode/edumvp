/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        primary: {
          50: "#E0F7FA",
          100: "#B2EBF2",
          500: "#00BCD4",
          600: "#00ACC1",
          700: "#0097A7",
        },
      },
    },
  },
    plugins: [],
  };
  