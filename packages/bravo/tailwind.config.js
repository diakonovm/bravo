/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#6594ab',
        primary: '#2f3e4a',
        'oxford-blue': {
          50: '#f2f7f9',
          100: '#deeaef',
          200: '#c2d6df',
          300: '#97b9c9',
          400: '#6594ab',
          500: '#4a7890',
          600: '#40637a',
          700: '#395365',
          800: '#364958',
          900: '#2f3e4a'
        }
      }
    }
  },
  plugins: []
}
