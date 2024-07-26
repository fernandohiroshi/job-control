import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#249AC6",
        red: "#ED1A84",
        orange: "#F4881F",
        purple: "#8F3D91",
        yellow: "#BBD73C",
        dark: "#2B2F40",
      },
    },
  },
  plugins: [],
};

export default config;
