/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF6F0",
        foreground: "#35252E",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#35252E",
        },
        muted: {
          DEFAULT: "#F7EFE9",
          foreground: "#7E6A74",
        },
        border: "#F0DFD7",
        primary: {
          DEFAULT: "#F472B6",
          foreground: "#FFFFFF",
        },
        cream: {
          50: "#FFFDFB",
          100: "#FDF8F3",
          200: "#FAF4EC",
          300: "#F5ECE1",
          400: "#EEDCC9",
        },
        pastel: {
          pink: "#FBCFE8",
          blush: "#FCE7F3",
          rose: "#FDA4AF",
          berry: "#DB2777",
          mocha: "#35252E",
          soft: "#7E6A74",
        },
      },
    },
  },
  plugins: [],
};
