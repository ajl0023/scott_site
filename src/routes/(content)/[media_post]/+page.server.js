import _ from 'lodash-es';
import { url_new } from '../../../lib/dev';
import { getJson } from '../../../lib/utils/utils';
export const prerender = false;
export async function load({ fetch, url, params }) {
	let slug = params.media_post;

	const getPageData = async () => {
		const page_data = await getJson(
			fetch(`${url_new}/api/media-posts?filters[slug][$eq]=${slug}&populate=deep`, {
				headers: {
					Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`
				}
			})
		);

		return page_data;
	};

	return {
		page_data: getPageData()
	};
}
