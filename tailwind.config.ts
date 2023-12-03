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
        bg: {
          DEFAULT: 'var(--background)',
          100: 'var(--background-100)',
          200: 'var(--background-200)',
          300: 'var(--background-300)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          100: 'var(--secondary-100)',
          200: 'var(--secondary-200)',
        },
        color3: {
          DEFAULT: 'var(--color3)',
          100: 'var(--color3-100)',
          200: 'var(--color3-200)',
        },
        color4: {
          DEFAULT: 'var(--color4)',
        },
        color5: {
          DEFAULT: 'var(--color5)',
        },
      },
    },
  },
  plugins: [],
};
export default config;
