import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        myFont: ['Geist', 'sans'], 
      },
    },
  },
  plugins: [],
} satisfies Config;