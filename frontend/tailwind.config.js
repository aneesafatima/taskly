/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        "nav-color" : "var(--main-nav-color)",
        "border-color" : "var(--main-border-color)"
      },
      backgroundImage: {
       "to-do-gradient" : "linear-gradient(90deg, rgba(243,227,172,1) 0%, rgba(242,186,24,1) 100%)",
       "progress-gradient" : "linear-gradient(90deg, rgba(244,127,249,1) 0%, rgba(99,0,146,1) 100%)",
       "completed-gradient" : "linear-gradient(90deg, rgba(127,144,249,1) 0%, rgba(7,16,191,1) 100%)"
      }
    },
  },
  plugins: [],
};
