import _ from 'lodash-es';
import { url_new } from '../../../lib/dev';
import { getJson } from '../../../lib/utils/utils';
export const prerender = true;
export async function load({ fetch, url }) {
	const getPageData = async () => {
		const page_data = await getJson(
			fetch(
				`${url_new}/api/reviews?pagination[page]=1&pagination[pageSize]=10&populate=deep&filters[publish][$eq]=true`,
				{
					headers: {
						Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`
					}
				}
			)
		);

		return page_data;
	};

	return {
		page_data: getPageData()
	};
}
