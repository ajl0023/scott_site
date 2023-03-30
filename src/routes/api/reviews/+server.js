import { json } from '@sveltejs/kit';
import { strapi_token, url_new } from '$lib/dev';
import { getJson } from '$lib/utils/utils';

export async function GET({ fetch, url }) {
	// log all headers
	const page = url.searchParams.get('page');

	const page_data = await getJson(
		fetch(
			`${url_new}/api/reviews?pagination[page]=${page}&pagination[pageSize]=10&populate=deep&filters[publish][$eq]=true`,
			{
				headers: {
					Authorization: `Bearer ${strapi_token}`
				}
			}
		)
	);

	return json({
		// retrieve a specific header

		data: page_data
	});
}
