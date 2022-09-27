/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'bg-limegreen-100',
    'bg-green-100',
    'bg-orange-100',
    'bg-deepblue-100',
    'bg-purple-100',
    'bg-gray-100',
    'border-limegreen-300',
    'border-green-300',
    'border-orange-300',
    'border-deepblue-300',
    'border-purple-300',
    'border-gray-300'
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
  presets: [require('@navikt/ds-tailwind')],
}
