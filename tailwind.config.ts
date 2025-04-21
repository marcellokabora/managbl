import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'
import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-geist-sans)'],
                mono: ['var(--font-geist-mono)'],
            },
            // Customize form styles
            borderRadius: {
                'input': '0.25rem', // changed from 0.5rem to 0.25rem (rounded-md)
            },
            colors: {
                'form-border': 'rgb(209 213 219)', // border-gray-300
                'form-focus': 'rgb(59 130 246)', // focus:border-blue-500
            },
            ringWidth: {
                'form': '2px',
            },
        },
    },
    plugins: [
        typography,
        forms({
            strategy: 'class',
        }),
    ],
}
export default config 