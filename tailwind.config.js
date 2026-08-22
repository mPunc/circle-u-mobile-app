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
        danger: "#ff1c1c",
        success: "#4ea35e",
        black: "#001619",
        white: "#F0FDFF",
        darkGray: "#1F2020",

        lightBackground: "#F0FDFF",
        lightText: "#18181B",

        darkBackground: "#1F2020",
        darkText: "#F4F4F6",
      }
    },
  },
  plugins: [],
};
