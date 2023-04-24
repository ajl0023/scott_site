import _ from 'lodash-es';
import { strapi_token, url_new } from '$lib/dev';
import { getJson } from '$lib/utils/utils';

export async function load({ fetch, url }) {
	const getPageData = async () => {
		const page_data = await getJson(
			fetch(`${url_new}/api/media-posts?pagination[page]=1&pagination[pageSize]=10&populate=deep&sort=created_on%3Adesc`, {
				headers: {
					Authorization: `Bearer ${strapi_token}`
				}
			})
		);

		return page_data;
	};

	return {
		page_data: getPageData()
	};
}
