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

		return json['data']['attributes'];
	};
	const navBarData = async () => {
		const data = await fetch(`${url_new}/api/menus/1?populate=*&nested`, {
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`
			}
		});

		const json = await data.json();

		// json.data.attributes.items.data.push({
		// 	attributes: {
		// 		title: 'Language'
		// 	}
		// });

		return json.data.attributes.items.data;
	};
	await navBarData();
	return {
		layout_data: getLayoutData(),
		navbar_data: navBarData()
	};
}
