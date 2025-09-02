/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f2f7fc",
          100: "#e2edf7",
          200: "#ccdff1",
          300: "#a8cce8",
          400: "#7fb1db",
          500: "#6095d0",
          600: "#4d7dc3",
          700: "#436ab2",
          800: "#3b5892",
          900: "#344b74",
          950: "#232f48",
        },
        secondary: {
          50: "#f6ffe5",
          100: "#e9ffc7",
          200: "#d3ff95",
          300: "#c0fe71",
          400: "#98f526",
          500: "#77db07",
          600: "#5aaf01",
          700: "#458506",
          800: "#39690b",
          900: "#31580f",
          950: "#173102",
        },
      },
      boxShadow: {
        "focus-outer": "0 0 0 2px rgb(127 177 219)",
        "invalid-outer": "0 0 0 2px rgb(232 136 134)",
      },
    },
    fontFamily: {
      "helvetica-neue": ["Helvetica Neue", "Arial", "sans-serif"],
    },
  },
};
