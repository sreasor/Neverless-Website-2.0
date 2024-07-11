import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: 
      {
        'bg1': "url('/liveband.jpg')"
      },
      fontFamily: {
        'home': ['Cinzel Decorative', 'sans-serif']
      },
    },
  },
  plugins: [],
};
export default config;
