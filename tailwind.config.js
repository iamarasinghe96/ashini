/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette: soft pink + champagne
        pink: {
          light: '#FBE4EC',
          soft: '#F6CEDD',
          DEFAULT: '#E79DBE',
          dark: '#C77995',
        },
        champagne: {
          light: '#FBF5EA',
          soft: '#F2E6CE',
          DEFAULT: '#E4CFA3',
          dark: '#C2A56B',
        },
        ink: '#4A3B40',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Poppins"', 'system-ui', 'sans-serif'],
      },
      // Numeric weight aliases (font-400 … font-700) used throughout the UI.
      fontWeight: {
        400: '400',
        500: '500',
        600: '600',
        700: '700',
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(199, 121, 149, 0.35)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}
