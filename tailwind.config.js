/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#9FF7FF",
        primaryLight: "#D9F7FF",
        primaryText: "#18181B",
        primaryAccent: "#4DF0FF",

        danger: "#ff1c1c",
        dangerLight: "#ffbaba",
        success: "#4ea35e",
        successLight: "#C8E6C9",


        lightBackground: "#F2F2F2",
        lightText: "#18181B",
        lightSurface: "#FFFFFF",
        lightAccent: "#9FF7FF",

        darkBackground: "#1F2020",
        darkText: "#F4F4F6",
        darkSurface: "#2C2C2E",
        darkAccent: "#131313"
      }
    },
  },
  plugins: [],
};
