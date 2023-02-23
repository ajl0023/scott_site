import _ from 'lodash-es';
import { url_new } from '$lib/dev';
import { getJson } from '$lib/utils/utils';

export async function load({ fetch, url, params }) {
	let slug = params.media_post;
	const id = params.id;

	console.log(id);
	const getPropertyData = async () => {
		const page_data = await getJson(
			fetch(`${url_new}/api/listing-properties?filters[listing_id][$eq]=${id}&populate=deep`, {
				headers: {
					Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`
				}
			})
		);

		return page_data['data'][0]['attributes'];
	};

	return {
		property_data: getPropertyData()
	};
}
