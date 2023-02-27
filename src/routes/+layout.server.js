import { url_new } from '../lib/dev';
export const prerender = true;

export async function load({ fetch }) {
	const getLayoutData = async () => {
		const data = await fetch(`${url_new}/api/global?populate=deep`, {
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`
			}
		});

		const json = await data.json();

		json['data']['attributes']['navbar'].push({
			label: 'language',
			nav_options: []
		});
	
		return json['data']['attributes'];
	};

	return {
		layout_data: getLayoutData()
	};
}
