import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        floema: {
          bg: "#ebe7df",
          fg: "#241f21",
          accent: "#e9e778",
          card: "#f4f1ea",
          muted: "#75706b",
          greenery: "#3a543f",
        },
        midnight: "#241f21",
        deepblue: "#1a1718",
        brand: {
          bg: "#241f21",
          text: "#241f21",
          muted: "#75706b",
          gray: "#ebe7df",
          white: "#ffffff",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        floema: "3px 3px 0px #241f21",
        "floema-sm": "2px 2px 0px #241f21",
        "floema-accent": "3px 3px 0px #e9e778",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.25rem",
          md: "1.5rem",
          lg: "2rem",
          xl: "2.5rem",
        },
      },
    },
  },
  plugins: [],
};

export default config;
