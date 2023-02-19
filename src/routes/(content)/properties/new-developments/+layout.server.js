import { url_new } from '../../../../lib/dev';

export async function load({ fetch, params, depends, url }) {
	let path = url.pathname;
	let segments = path.split('/');
	let slug = segments[2];
	const getPageData = async () => {
		const req = await fetch(`${url_new}/api/new-development?populate=deep`, {
			headers: {
				Authorization:
						`Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`
				// 'Content-Type': 'application/x-www-form-urlencoded',
			}
		});
		const json = await req.json();

		return json['data'];
	};

	return {
		page_data: getPageData()
	};
}
