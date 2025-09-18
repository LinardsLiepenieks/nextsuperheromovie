/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        'roboto-condensed': ['Roboto Condensed', 'sans-serif'],
      },
      fontSize: {
        // Map your CSS variables to proper Tailwind text size classes
        hero: 'var(--hero)', // text-hero (custom)
        'hero-sm': 'var(--hero-sm)', // text-hero-sm (custom)
        'title-xl': 'var(--title-xl)', // text-title-xl (custom)
        'title-lg': 'var(--title-lg)', // text-title-lg (custom)
        title: 'var(--title)', // text-title (custom)
        '5xl': 'var(--fs-xxxxl)', // text-5xl
        '4xl': 'var(--fs-xxxl)', // text-4xl
        '3xl': 'var(--fs-xxl)', // text-3xl
        '2xl': 'var(--fs-xl)', // text-2xl
        xl: 'var(--fs-lg)', // text-xl
        base: 'var(--fs-md)', // text-base
      },
      colors: {
        primary: 'rgb(from var(--primary) r g b / <alpha-value>)',
        secondary: 'rgb(from var(--secondary) r g b / <alpha-value>)',
        accent: 'rgb(from var(--accent) r g b / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
