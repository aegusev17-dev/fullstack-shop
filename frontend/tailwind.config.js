/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx,vue}", // все файлы проекта
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        sidebar: {
          DEFAULT: "#1f2937",
          dark: "#111827",
          light: "#374151",
        },
      },
      spacing: {
        sidebar: "250px",
        "sidebar-collapsed": "4.6rem",
      },
      minHeight: {
        100: "100px", // для textarea и других элементов
      },
    },
  },
  plugins: [],
  corePlugins: {},
}