import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'mopao-green': '#009F4D',
        'mopao-grey': '#F8F8F8',
        'mopao-bg': '#FFFFFF',
        'mopao-text': '#111111',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
      }
    },
  },  
  plugins: [
    require("@tailwindcss/typography"), 
    require("@tailwindcss/forms"), 
    require("daisyui")
  ],
};

export default config;
