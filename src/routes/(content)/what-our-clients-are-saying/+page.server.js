import { strapi_token, url_new } from '$lib/dev';
import { getJson } from '$lib/utils/utils';
export const prerender = true;
export async function load({ fetch, url }) {
	const getPageData = async () => {
		const page_data = await getJson(
			fetch(
				`${url_new}/api/reviews?pagination[page]=1&pagination[pageSize]=10&populate=deep&filters[publish][$eq]=true`,
				{
					headers: {
						Authorization: `Bearer ${strapi_token}`
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
