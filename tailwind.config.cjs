/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {
			fontFamily: {
				roboto: ['Roboto', 'sans-serif'],

				barlow: 'Barlow Semi Condensed, sans-serif',

				sourceSans: 'Source Sans Pro, sans-serif',
				agentImage_icon: 'agentImage'
			}
		}
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant('not-last', '&:not(:last-child)');
		}),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/line-clamp'),
		require('@tailwindcss/typography'),
		require('flowbite/plugin')
	]
};
