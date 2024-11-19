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
          grey: '#575757',
          'grey-brighter': '#878787',
        },
        secondary: {
          pink: '#FFC0CB',
          'pink-darker': '#997379',
          'pink-lighter': '#fff7fa',
        },
        accent: {
          green: '#BCD3BB',
          brown: '#D3C4BB',
          yellow: '#D1D3BB',
          blue: '#BBCCD3',
        },
      },
      textColor: {
        body: '#222222', // All general text as blackish
        header: '#40403B', // All headers as grey
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
