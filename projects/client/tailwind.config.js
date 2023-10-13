// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAFA",
        ground: "#112500",
        primary: {
          50: "#F4FDE2",
          100: "#EAFCC5",
          200: "#D4F98B",
          300: "#BFF650",
          400: "#A9F316",
          500: "#83C00A",
          600: "#6A9B08",
          700: "#507406",
          800: "#354E04",
          900: "#1B2702",
          950: "#0D1301"
        },
        secondary: {
          50: "#FFFAF0",
          100: "#FFF6E0",
          200: "#FFEBBD",
          300: "#FFE29E",
          400: "#FFD77A",
          500: "#FFCE5C",
          600: "#FFB914",
          700: "#D19200",
          800: "#8A6000",
          900: "#473200",
          950: "#241900"
        },
        accent: "#304607",
        warning: "#FFE455",
        error: "#F44A4A",
        success: "#4FEF68"
      },
      fontSize: {
        "display-lg": "57px",
        "display-md": "45px",
        "display-sm": "36px",
        "headline-lg": "32px",
        "headline-md": "28px",
        "headline-sm": "24px",
        "title-lg": "22px",
        "title-md": "16px",
        "title-sm": "14px",
        "label-lg": "14px",
        "label-md": "12px",
        "label-sm": "11px",
        "body-lg": "16px",
        "body-md": "14px",
        "body-sm": "12px"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};