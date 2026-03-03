/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        garnet: "var(--color-garnet)",
        gold: "var(--color-gold)",
        cream: "var(--color-cream)",
        card: "var(--color-card)",
        border: "var(--color-border)",
        muted: "var(--color-muted)",
        goldhover: "var(--color-gold-hover)",
      },
    },
  },
  plugins: [],
}