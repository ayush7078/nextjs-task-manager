/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}', // Ensure the correct directories
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}', // Include the app directory if using the App Router
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
