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
        main: '#1D1D1D',
        defaultcolor: '#E8E8E8',
        primary: {
          50: '#fff7e0',
          100: '#ffecad',
          200: '#ffe07a',
          300: '#ffd447',
          400: '#ffc914',
          500: '#e0ac00',
          600: '#ad8500',
          700: '#7a5e00',
          800: '#473600',
          900: '#140f00'
        },
        secondary: {
          100: '#e5f8ff',
          200: '#bceeff',
          300: '#89e2ff',
          400: '#56d5ff',
          500: '#23c9ff',
          600: '#00b4ef',
          700: '#008ebc',
          800: '#006789',
          900: '#004156'
        },
        gray: {
          100: '#e8e8e8',
          200: '#cecece',
          300: '#b5b5b5',
          400: '#9b9b9b',
          500: '#828282',
          600: '#686868',
          700: '#4e4e4e',
          800: '#353535',
          900: '#1d1d1d'
        }
      },
      fontFamily: {
        thin: ['Pretendard-Thin', 'sans-serif'],
        extraLight: ['Pretendard-ExtraLight', 'sans-serif'],
        light: ['Pretendard-Light', 'sans-serif'],
        regular: ['Pretendard-Regular', 'sans-serif'],
        medium: ['Pretendard-Medium', 'sans-serif'],
        semiBold: ['Pretendard-SemiBold', 'sans-serif'],
        bold: ['Pretendard-Bold', 'sans-serif'],
        extraBold: ['Pretendard-ExtraBold', 'sans-serif'],
        black: ['Pretendard-Black', 'sans-serif']
      }
    },
    backgroundImage: {
      scrollButtonGradient:
        'linear-gradient(to bottom, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.8) 20%, white 100%)',
      backgroundGradient: 'linear-gradient(to bottom, white, #ddf3fc)'
    },
    boxShadow: {
      overlayShadow: '0 -1px 12px rgba(68, 68, 68, 0.15)'
    },
    screens: {
      lg: '1024px' // 데스크탑 추후 수정가능
    },
    animation: {
      fadeUpText: 'fadeUp .8s ease-in-out',
      fadeUpBtn: 'fadeUp 1.2s ease-in-out',
      slideDownModal: 'slideDown .4s linear',
      spin: 'spin 1s linear infinite'
    },

    keyframes: {
      fadeUp: {
        from: { opacity: '0', transform: 'translateY(100%)' },
        to: { opacity: '1', transform: 'translateY(0)' }
      },
      slideDown: {
        from: {
          transform: 'translateY(342px)'
        },
        to: {
          transform: 'translateY(0)'
        }
      },
      spin: {
        to: { transform: 'rotate(360deg)' }
      }
    }
  }
};
export default config;
