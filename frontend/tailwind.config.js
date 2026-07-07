/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        industrial: {
          black: "#050505",
          panel: "#111111",
          panelAlt: "#181818",
          line: "#3f3f46",
          muted: "#a1a1aa",
          steel: "#d4d4d8",
          amber: "#f59e0b",
          green: "#22c55e",
          red: "#ef4444",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "ui-monospace", "monospace"],
      },
      boxShadow: {
        online: "0 0 18px rgba(34, 197, 94, 0.45)",
        offline: "0 0 22px rgba(239, 68, 68, 0.5)",
      },
    },
  },
  plugins: [],
};
