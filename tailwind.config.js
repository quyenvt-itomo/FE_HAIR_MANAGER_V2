/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F1F1F1",
        primary: "#01579B",
        secondary: "#EF3826",
      },
      borderRadius: {
        normal: "3px",
      },
    },
  },
  plugins: [],
};
