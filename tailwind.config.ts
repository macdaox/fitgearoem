import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101114",
        graphite: "#2d3138",
        mist: "#f5f7fa",
        line: "#e7eaee",
        volt: "#b7f34b",
        ocean: "#1f8ea5"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        soft: "0 18px 50px rgba(16, 17, 20, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
