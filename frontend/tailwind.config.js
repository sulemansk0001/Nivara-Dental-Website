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
          DEFAULT: '#38BDF8',
          hover: '#0EA5E9',
          light: '#E0F2FE',
          soft: '#BAE6FD',
          subtle: '#F0F9FF',
          dark: '#0284C7',
          darker: '#0369A1',
        },
        skyblue: {
          DEFAULT: '#38BDF8',
          hover: '#0EA5E9',
          light: '#E0F2FE',
          soft: '#BAE6FD',
          subtle: '#F0F9FF',
          dark: '#0284C7',
          darker: '#0369A1',
          border: '#D6EAF7',
        },
        coral: {
          DEFAULT: '#38BDF8',
          hover: '#0EA5E9',
          subtle: '#F0F9FF',
          light: '#E0F2FE',
        },
        navy: {
          DEFAULT: '#252525',
          light: '#64748B',
          dark: '#F0F9FF',
          deep: '#F8FCFF',
        },
        clinic: {
          bg: '#FFFFFF',
          section: '#F0F9FF',
          accent: '#E0F2FE',
          warm: '#F0F9FF',
          text: '#252525',
          heading2: '#334155',
          body: '#475569',
          muted: '#64748B',
          link: '#0284C7',
          linkHover: '#0369A1',
          border: '#D6EAF7',
          borderLight: '#BAE6FD',
          card: '#FFFFFF',
        }
      },
      fontFamily: {
        heading: ['Manrope', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(37, 37, 37, 0.04), 0 1px 2px -1px rgba(37, 37, 37, 0.02)',
        'premium': '0 10px 25px -5px rgba(56, 189, 248, 0.08), 0 8px 10px -6px rgba(37, 37, 37, 0.03)',
        'elevated': '0 20px 35px -10px rgba(56, 189, 248, 0.2), 0 10px 15px -8px rgba(37, 37, 37, 0.04)',
        'spotlight': '0 25px 50px -12px rgba(56, 189, 248, 0.28), 0 0 0 1px rgba(56, 189, 248, 0.35)',
      },
      borderRadius: {
        'brand': '12px',
        'card': '16px',
        'section': '24px',
      }
    },
  },
  plugins: [],
}
