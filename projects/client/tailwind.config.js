// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				'text': 'var(--text)',
				'background': 'var(--background)',
				'primary': {
					50: 'var(--primary-50)',
					100: 'var(--primary-100)',
					200: 'var(--primary-200)',
					300: 'var(--primary-300)',
					400: 'var(--primary-400)',
					500: 'var(--primary-500)',
					600: 'var(--primary-600)',
					700: 'var(--primary-700)',
					800: 'var(--primary-800)',
					900: 'var(--primary-900)',
					950: 'var(--primary-950)',
				},
				'secondary': {
					50: 'var(--secondary-50)',
					100: 'var(--secondary-100)',
					200: 'var(--secondary-200)',
					300: 'var(--secondary-300)',
					400: 'var(--secondary-400)',
					500: 'var(--secondary-500)',
					600: 'var(--secondary-600)',
					700: 'var(--secondary-700)',
					800: 'var(--secondary-800)',
					900: 'var(--secondary-900)',
					950: 'var(--secondary-950)',
				},
				'accent': {
					50: 'var(--accent-50)',
					100: 'var(--accent-100)',
					200: 'var(--accent-200)',
					300: 'var(--accent-300)',
					400: 'var(--accent-400)',
					500: 'var(--accent-500)',
					600: 'var(--accent-600)',
					700: 'var(--accent-700)',
					800: 'var(--accent-800)',
					900: 'var(--accent-900)',
					950: 'var(--accent-950)',
				},
			},
			fontSize: {
				'headline-lg': '32px',
				'headline-md': '28px',
				'headline-sm': '24px',
				'title-lg': '22px',
				'title-md': '16px',
				'title-sm': '14px',
				'body-lg': '16px',
				'body-md': '14px',
				'body-sm': '12px',
				'price-lg': '28px',
				'price-md': '18px',
				'price-sm': '16px',
				'price-xs': '14px',
				'label-lg': '14px',
				'label-md': '12px',
				'label-sm': '11px',
			}
		},
	},
	darkMode: "class",
	plugins: [nextui({ addCommonColors: true })],
};