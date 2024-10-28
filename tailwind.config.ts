import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'FFC914',
        secondary: '23C9FF',
        main: '1D1D1D',
        defaultcolor: '#E8E8E8'
      }
    },
    screens: {
      lg: '1024px' // 데스크탑 추후 수정가능
    },
    animation: {
      fadeUpText: 'fadeUp .8s ease-in-out',
      fadeUpBtn: 'fadeUp 1.2s ease-in-out'
    },

    keyframes: {
      fadeUp: {
        from: { opacity: '0', transform: 'translateY(100%)' },
        to: { opacity: '1', transform: 'translateY(0)' }
      }
    }
  },
  plugins: []
};
export default config;
