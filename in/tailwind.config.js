/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        bounce: "bounce 1s infinite",
      },
      colors: {
        backGround: {
          grey: "#ECECEC",
          grey1: "#F8F8F8",
        },
        grey: "#ECECEC",
        grey1: "#F8F8F8",
        grey2: "#D8D8D8",
        grey3: "#9E9E9E",
        grey4: "#EDEDED",
        red: {
          secondary: "#CE483F",
        },
        red1: "#ED1C24",
      },
      width: {
        54: "216px",
      },
      screens: {
        // "sm":"800px",
        sm: "768px", // Changed to default pixel [By @Mrutyunjaya]
      },
    },
  },

  plugins: [],
};
