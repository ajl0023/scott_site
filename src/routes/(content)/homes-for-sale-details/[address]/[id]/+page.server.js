import { strapi_token, url_new } from '$lib/dev';
import { getJson } from '$lib/utils/utils';
import { error } from '@sveltejs/kit';

export async function load({ fetch, url, params }) {
	let slug = params.media_post;
	const id = params.id;

	const getPropertyData = async () => {
		const page_data = await getJson(
			fetch(`${url_new}/api/listing-properties?filters[id][$eq]=${id}&populate=deep`, {
				headers: {
					Authorization: `Bearer ${strapi_token}`
				}
			})
		);
		if (page_data['data'].length === 0) throw error(404, 'Not found');
		return page_data['data'][0]['attributes'];
	};

	return {
		property_data: getPropertyData()
	};
}
