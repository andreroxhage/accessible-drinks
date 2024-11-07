import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blackish: '#222222',
          whiteish: '#FEFEFE',
          grey: '#40403B',
          'grey-brighter': '#5D5D56',
        },
        secondary: {
          pink: '#FFC0CB',
          'pink-darker': '#997379',
          'pink-lighter': '#ffedf4',
        },
        accent: {
          green: '#BCD3BB',
          brown: '#D3C4BB',
          yellow: '#D1D3BB',
          blue: '#BBCCD3',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
