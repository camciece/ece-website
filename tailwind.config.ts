// tailwind.config.ts
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: { extend: {} },
  plugins: [typography],
};

export default config;
