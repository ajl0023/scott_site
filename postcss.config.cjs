const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const flexGapPolyfill = require('flex-gap-polyfill');

const config = {
	plugins: [
		//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
		
		tailwindcss(),
		require('postcss-nested'),
		//But others, like autoprefixer, need to run after,
		autoprefixer
	]
};

module.exports = config;