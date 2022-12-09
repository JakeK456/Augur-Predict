/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-theme-1": "#000000",
        "dark-theme-2": "#161B22",
        "dark-theme-3": "#ffffff",
        "dark-theme-4": "#519872",
        "dark-theme-5": "#A4B494",
        "dark-theme-6": "#E9EAEA",
        "dark-theme-green": "#6DD35E",
        "dark-theme-green-op": "#1C2E2A",
        "dark-theme-blue": "#2F91E7",
        "dark-theme-border": "#30363D",
        "dark-surface-hover": "#1F6FEB",
        "dark-hover-text": "#E7F0FD",
      },
    },
  },
  plugins: [],
};

// "dark-theme-3": "#696E8F"
