// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6', // Hlavní barva
          light: '#60a5fa',   // Světlejší varianta
          dark: '#181818',    // Tmavší varianta
        },
        surface: {
          light: '#f8f9fa',   // Pozadí 
          dark: '#0d0d0d',    // Pozadí 
        },
        panel: {
          light: '#e9ecef',   // UI elementy
          dark: '#1e1e1e',    // UI elementy
        },
        content: {
          light: '#f8f9fa',   // Text
          dark: '#212529',    // Text
        },
        dpurple: {
          primary: '#13003e'
        }
      },
    },
  },
}

export default config