import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg1': "url('/liveband.jpg')",
        'bg2': "url('/album2.jpg')"
      },
      minWidth: {
        '80': '80%',  // Custom minWidth value
      },
      fontFamily: {
        'home': ['Cinzel Decorative', 'sans-serif']
      },
      screens: {
        'sm': '400px',  // Minimum width of 400px
        'md': '700px',  // Minimum width of 700px
        'lg': '1400px', // Minimum width of 1920px
      },
    },
  },
  plugins: [],
};
export default config;
