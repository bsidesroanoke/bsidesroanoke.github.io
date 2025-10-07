import typography from '@tailwindcss/typography';

export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        'accent-blue': '#00bcd4',
        'accent-green': '#00c853',
        'bg-dark': '#121212',
        'surface-dark': '#1e1e1e',
        'text-light': '#e0e0e0'
      }
    },
  },
  plugins: [typography],
}
