import { json } from '@sveltejs/kit';
import { url_new } from '../../../lib/dev';
import { getJson } from '../../../lib/utils/utils';

export async function GET(event) {
	// log all headers
	const page = event.url.searchParams.get('page');

	const page_data = await getJson(
		fetch(
			`${url_new}/api/reviews?pagination[page]=${page}&pagination[pageSize]=10&populate=deep&filters[publish][$eq]=true`,
			{
				headers: {
					Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`
				}
			}
		)
	);

	return json({
		// retrieve a specific header

		data: page_data
	});
}
