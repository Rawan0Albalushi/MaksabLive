/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Maksab Brand Colors
        maksab: {
          coral: '#F26F59',       // Primary coral/orange
          teal: '#25B0BA',        // Primary teal/turquoise
          'coral-light': '#F7968A',
          'coral-dark': '#D95A46',
          'teal-light': '#4DC4CC',
          'teal-dark': '#1D9099',
        },
        dark: {
          900: '#0a0a0b',
          800: '#111113',
          700: '#18181b',
          600: '#1f1f23',
          500: '#27272a',
        },
        accent: {
          primary: '#F26F59',    // Maksab coral
          secondary: '#25B0BA',  // Maksab teal
          tertiary: '#F7968A',   // Coral light
          cyan: '#25B0BA',       // Teal
          emerald: '#1D9099',    // Teal dark
        },
        glass: {
          white: 'rgba(255, 255, 255, 0.03)',
          border: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(255, 255, 255, 0.06)',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(135deg, #F26F59 0%, #D95A46 25%, #25B0BA 75%, #1D9099 100%)',
        'aurora': 'linear-gradient(135deg, rgba(242, 111, 89, 0.15) 0%, rgba(37, 176, 186, 0.15) 100%)',
        'maksab-gradient': 'linear-gradient(135deg, #F26F59 0%, #25B0BA 100%)',
        'maksab-gradient-reverse': 'linear-gradient(135deg, #25B0BA 0%, #F26F59 100%)',
      },
      animation: {
        'glow': 'glow 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slide-down 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
      },
      keyframes: {
        'glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(242, 111, 89, 0.3), 0 0 40px rgba(37, 176, 186, 0.2)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(242, 111, 89, 0.5), 0 0 80px rgba(37, 176, 186, 0.3)',
          },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(1deg)' },
          '66%': { transform: 'translateY(5px) rotate(-1deg)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 20px rgba(242, 111, 89, 0.5)',
          },
          '50%': {
            opacity: '0.8',
            boxShadow: '0 0 40px rgba(37, 176, 186, 0.7)',
          },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'morph': {
          '0%, 100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      fontFamily: {
        'display': ['IBM Plex Sans Arabic', 'Syne', 'sans-serif'],
        'arabic': ['IBM Plex Sans Arabic', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
