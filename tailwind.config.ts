import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        deep: "#2C246B",
        lemon: "#FFF700",
        bold: "#DD251D",
        offwhite: "#F8F8F4",
        dark: "#1A1530",
        muted: "#6B6490",
      },
      fontFamily: {
        serif: ["PT Serif", "serif"],
        sans: ["PT Sans", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;