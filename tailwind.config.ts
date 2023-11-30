import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "theme-foreground": "#000000",
        "theme-background": "#F0F0F6",
        "theme-gray-medium": "#A0A0A0",
        "theme-gray-dark": "#333333",
        "theme-text-white": "#F8F7FF",
        "theme-text-primary": "#5E56E7",
      },
      boxShadow: {
        "theme-options-card-shadow": "0 2px 5px 0 rgba(211, 209, 238, 0.5)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'theme-title-pattern': "url('/new_assets/Pattern.svg')"
      },
    },
  },
  plugins: [],
}
export default config
