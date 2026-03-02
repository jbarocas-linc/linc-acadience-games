import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lincBlue: '#12306b',
        lincGreen: '#1ab34b',
        bandRed: '#d94444',
        bandYellow: '#e8b63d',
        bandGreen: '#5a9d45',
        bandBlue: '#2f73b7',
      },
      fontFamily: {
        display: ['Tebal', 'sans-serif'],
        callout: ['MoreSugar', 'cursive'],
        body: ['system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp .28s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
