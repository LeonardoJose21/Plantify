/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "fade-in-out": { // Keyframes for fade-in and fade-out
          "0%, 100%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "50%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "spin": {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        "fade-in-out": "fade-in-out 5s ease-in-out infinite",
        "spin": 'spin 1s linear infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
