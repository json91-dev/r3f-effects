/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    fontFamily: {
      Inter: ['Inter', 'Arial', 'sans-serif'],
      NotoSansKR: ['Noto Sans KR', 'Arial', 'sans-serif'],
      NotoSansCJK: ['Noto Sans CJK KR', 'Arial', 'sans-serif'],
    },
    colors: {
    
    },
    borderRadius: {
    
    },
    extend: {
      transitionProperty: {
        width: 'width',
      },
    },
    screens: {
      xs: '475px',
      xxs: '360px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
}
