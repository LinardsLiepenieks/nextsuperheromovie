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
        hero: 'var(--hero)',
        'hero-sm': 'var(--hero-sm)',
        'title-xl': 'var(--title-xl)',
        'title-lg': 'var(--title-lg)',
        title: 'var(--title)',
        '5xl': 'var(--fs-xxxxl)',
        '4xl': 'var(--fs-xxxl)',
        '3xl': 'var(--fs-xxl)',
        '2xl': 'var(--fs-xl)',
        xl: 'var(--fs-lg)',
        base: 'var(--fs-md)',
      },
      colors: {
        primary: 'rgb(from var(--primary) r g b / <alpha-value>)',
        secondary: 'rgb(from var(--secondary) r g b / <alpha-value>)',
        accent: 'rgb(from var(--accent) r g b / <alpha-value>)',
        'video-spinner-color':
          'rgb(from var(--video-spinner) r g b / <alpha-value>)',
        // Add theme-specific colors
        'title-color': 'rgb(from var(--title-color) r g b / <alpha-value>)',
        'effect-color': 'rgb(from var(--effect-color) r g b / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
