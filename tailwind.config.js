/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          50: '#FFF5F2',
          100: '#FFE8E0',
          200: '#FFD1C2',
          300: '#FFAA8F',
          400: '#FF8B5C',
          500: '#FF6B35',
          600: '#F54500',
          700: '#C23600',
          800: '#8F2800',
          900: '#5C1A00',
        },
        secondary: {
          DEFAULT: '#004E89',
          50: '#E6F0F9',
          100: '#CCE1F3',
          200: '#99C3E7',
          300: '#66A5DB',
          400: '#3387CF',
          500: '#004E89',
          600: '#003E6D',
          700: '#002F51',
          800: '#001F35',
          900: '#001019',
        },
        accent: {
          DEFAULT: '#FFD23F',
          50: '#FFFBF0',
          100: '#FFF7E0',
          200: '#FFEFC2',
          300: '#FFE7A3',
          400: '#FFDC71',
          500: '#FFD23F',
          600: '#FFC400',
          700: '#CC9D00',
          800: '#997600',
          900: '#664E00',
        },
        danger: {
          DEFAULT: '#EE4266',
          50: '#FEF2F4',
          100: '#FCE5E9',
          200: '#F9CBD3',
          300: '#F5A1B1',
          400: '#F1728C',
          500: '#EE4266',
          600: '#E81345',
          700: '#B90F36',
          800: '#8A0B28',
          900: '#5B071A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 12px rgba(0, 0, 0, 0.12)',
        'strong': '0 8px 24px rgba(0, 0, 0, 0.16)',
        'inner-soft': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

