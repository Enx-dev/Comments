/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primarymoderateBlue: "hsl(238, 40%, 52%)",
        primarysoftRed: "hsl(358, 79%, 66%)",
        primarylightGrayishBlue: "hsl(239, 57%, 85%)",
        primarypaleRed: "hsl(357, 100%, 86%)",
        secondarydarkBlue: "hsl(212, 24%, 26%)",
        secondarygrayishBlue: "hsl(211, 10%, 45%)",
        secondarylightGray: "hsl(223, 19%, 93%)",
        secondaryveryLightGray: " hsl(228, 33%, 97%)",
      },
    },
  },
  plugins: [],
};
