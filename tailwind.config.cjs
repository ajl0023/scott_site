/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
		fontFamily: {
			barlow: 'Barlow Semi Condensed, sans-serif'
		}
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant('not-last', '&:not(:last-child)');
		}),
		require('@tailwindcss/aspect-ratio')
	]
};
