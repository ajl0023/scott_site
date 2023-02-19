// import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			entries: ['*', '/sellers/decide-to-sell']
		}
	},

	preprocess: vitePreprocess({
		optimizeDeps: {
			include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep']
		}
	})
};

export default config;
