import { url_new } from '../lib/dev';

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
	const getServices = async () => {
		const req = await fetch(`${url_new}/api/services?populate=deep`, {
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`
				// 'Content-Type': 'application/x-www-form-urlencoded',
			}
		});
		const json = await req.json();

		return json['data'];
	};
	const getSocials = async () => {
		const req = await fetch(`${url_new}/api/profile-informations?populate=deep`, {
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`
				// 'Content-Type': 'application/x-www-form-urlencoded',
			}
		});
		const json = await req.json();

		return json['data'];
	};

	return {
		layout_data: getLayoutData(),
		socials: getSocials(),
		services: getServices()
	};
}
