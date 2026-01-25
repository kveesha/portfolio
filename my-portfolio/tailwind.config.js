/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
          fontFamily: {
        sans: ['"Bitcount Single"',"Roboto", "ui-sans-serif", "system-ui","Bebas Neue","Monospace"],
      },
      container: {
        center: true,
        padding: '1.25rem',
      },
    },
  },
  plugins: [],
};
