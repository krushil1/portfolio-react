/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        background: "#ffffff",
        foreground: "#383838",
        primary: "#f55c32",
        secondary: "#646161",
        accent: "#f8f8f8",
        muted: "#f0f0f0",
        border: "#e0e0e0",
        orange: "#f55c32",
        gray: "#646161",
        darkgray: "#383838",
        white: "#ffffff",
        lightgray: "#888888",
      },
      animation: {
        "bounce-slow": "bounce 3s linear infinite",
      },
    },
  },
  plugins: [],
};
