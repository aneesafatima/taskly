/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: '550px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1468px',
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        "nav-color" : "var(--main-nav-color)",
        "border-color" : "var(--main-border-color)",
        "task-bg" : "var(--task-card-color)",
        "priority-color" : "var(--priority-color",
        "priority-color" : "var(--priority-color)",
        "tags-color" : "var(--tags-color)",
      },
      backgroundImage: {
       "to-do-gradient" : "linear-gradient(90deg, rgba(243,227,172,1) 0%, rgba(242,186,24,1) 100%)",
       "progress-gradient" : "linear-gradient(90deg, rgba(244,127,249,1) 0%, rgba(99,0,146,1) 100%)",
       "completed-gradient" : "linear-gradient(90deg, rgba(127,144,249,1) 0%, rgba(7,16,191,1) 100%)"
      },
    
    },
  },
  plugins: [ 
    function ({ addUtilities }) {
    const newUtilities = {
      '.text-shadow-glow': {
        color: "white",
        textShadow: '0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 15px #ffffff, 0 0 20px #ffffff, 0 0 25px #ffffff',
      },
    };
    addUtilities(newUtilities, ['responsive', 'hover']);
  },],
};
