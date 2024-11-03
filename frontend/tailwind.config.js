/** @type {import('tailwindcss').Config} */

export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				'albert': ['Albert Sans', 'sans-serif'],
			},
			colors: {
				'secondary': '#d0fc65',
				'primary': '#798068',
				'tertiary': "#2e3918"
			},
			screens: {
				'tablet': '640px',
				// => @media (min-width: 640px) { ... }

				'laptop': '1024px',
				// => @media (min-width: 1024px) { ... }

				'desktop': '1440px',
				// => @media (min-width: 1280px) { ... }
			},
			backgroundImage: {
			}
		},
	},

	plugins: [],
}