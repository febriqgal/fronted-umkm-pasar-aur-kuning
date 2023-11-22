import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              "50": "#ecfff5",
              "100": "#d2ffea",
              "200": "#a8ffd6",
              "300": "#65ffb8",
              "400": "#1bff93",
              "500": "#00f973",
              "600": "#00d05b",
              "700": "#00a24b",
              "800": "#007e40",
              "900": "#00703c",
              DEFAULT: "#00703c",
            },
          },
        },
        dark: {
          colors: {},
        },
      },
    }),
  ],
};
export default config;
