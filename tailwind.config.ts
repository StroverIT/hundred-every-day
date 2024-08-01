import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    screens: {
      zeroToXl: { max: "1280px" },
      xs: { min: "350px" },
      sm: { min: "640px" },
      smToXl: { min: "640px", max: "1280px" },

      "max-sm": {
        max: "640px",
      },
      // => @media (min-width: 640px) { ... }

      md: { min: "768px" },
      "max-md": {
        max: "768px",
      },
      smToLg: { min: "640px", max: "1024px" },
      lg: { min: "1024px" },
      "max-lg": { max: "1024px" },
      xl: { min: "1280px" },

      "2xl": { min: "1536px" },
      "max-3xl": {
        max: "1800px",
      },
      "3xl": { min: "1800px" },
    },

    container: {
      center: true,
    },
  },
  plugins: [
    function ({ addComponents }: { addComponents: any }) {
      addComponents({
        ".container": {
          width: "min(100% - 2rem, 1300px);",
        },
      });
    },
  ],
};
export default config;
