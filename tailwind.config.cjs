/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
        poppinsBold: "PoppinsBold",
        courgette: "Courgette",
      },
    },
  },
  plugins: [],
};
