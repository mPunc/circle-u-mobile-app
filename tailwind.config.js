const { Colors } = require("./constants/Colors");

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
        primary: Colors.primary,
        primaryLight: Colors.primaryLight,
        primaryText: Colors.primaryText,
        primaryAccent: Colors.primaryAccent,
        neutralText: Colors.neutralText,

        danger: Colors.danger,
        dangerLight: Colors.dangerLight,
        success: Colors.success,
        successLight: Colors.successLight,

        lightBackground: Colors.light.background,
        lightText: Colors.light.text,
        lightSurface: Colors.light.surface,
        lightAccent: Colors.light.accent,
        lightIcon: Colors.light.icon,
        lightIconInactive: Colors.light.iconInactive,

        darkBackground: Colors.dark.background,
        darkText: Colors.dark.text,
        darkSurface: Colors.dark.surface,
        darkAccent: Colors.dark.accent,
        darkIcon: Colors.dark.icon,
        darkIconInactive: Colors.dark.iconInactive,
      }
    },
  },
  plugins: [],
};
