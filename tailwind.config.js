module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          900: "#1e2124",
          850: "#282b30",
          800: "#2f3136",
          700: "#36393f",
          600: "#424549",
        },
      },
    },
  },
  variants: {
    extend: {
      borderRadius: ["hover", "group-focus"],
      borderColor: ["group-focus"],
      scale: ["group-hover", "group-focus"],
      height: ["group-focus", "group-hover"],
    },
    scrollbar: ["rounded"],
  },
  plugins: [require("tailwind-scrollbar")],
};
