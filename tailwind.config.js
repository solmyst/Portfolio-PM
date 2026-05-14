/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Google UI Colors
        'google-blue': '#1A73E8',
        'google-blue-hover': '#1557B0',
        'google-blue-light': '#D3E3FD',
        'google-red': '#EA4335',
        'google-green': '#34A853',
        'google-yellow': '#FBBC04',
        
        // Docs UI Chrome
        'doc-toolbar': '#F8F9FA',
        'doc-surface': '#FFFFFF',
        'doc-text': '#202124',
        'doc-text-secondary': '#5F6368',
        'doc-link': '#1155CC',
        'doc-border': '#E0E0E0',
        'doc-border-medium': '#C7C7C7',
        
        // Document Page Background
        'doc-bg': '#F8F9FA',
      },
      fontFamily: {
        ui: ['Inter', '"Product Sans"', 'Arial', 'sans-serif'], // For the docs chrome
        doc: ['Arial', 'sans-serif'], // For the actual document content
      },
      boxShadow: {
        'page': '0 1px 4px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
      }
    },
  },
  plugins: [],
}