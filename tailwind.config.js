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
        "dark-theme-green": "#006D32",
        "dark-theme-green-hover": "#238636",
        "dark-theme-blue": "#2F91E7",
        "dark-theme-border": "#30363D",
        "dark-surface-hover": "#1F6FEB",
        "dark-hover-text": "#E7F0FD",
        "dark-bg": "#0D1117",
        "dark-bg-border": "#30363D",
        "dark-surface": "#161B22",
        "dark-surface-text": "#EFF6EE",
        "dark-bg-text-1": "#C9D1D9",
        "dark-bg-text-2": "#6E767E",
        "dark-bg-hover": "#21262C",
        "dark-nav-underline": "#F78166",
      },
    },
  },
  plugins: [],
};

// "dark-theme-3": "#696E8F"
