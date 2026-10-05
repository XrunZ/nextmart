import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        border: "var(--border)",
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
        },
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
      },
      borderRadius: {
        input: "8px",
        btn: "8px",
        card: "12px",
        panel: "16px",
      },
      maxWidth: {
        site: "1200px",
        readable: "760px",
      },
    },
  },
  plugins: [],
};

export default config;
