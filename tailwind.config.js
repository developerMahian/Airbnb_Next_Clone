module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "8px",
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("tailwindcss-debug-screens"),
  ],
};
