import { strapi_token, url_new } from '$lib/dev';
import { getJson } from '$lib/utils/utils';
export const prerender = true;

export async function load({ fetch }) {
	const homeData = await getJson(
		fetch(`${url_new}/api/home-page?populate=deep`, {
			headers: {
				Authorization: `Bearer ${strapi_token}`
				// 'Content-Type': 'application/x-www-form-urlencoded',
			}
		})
	);
	const data = homeData['data']['attributes'];
	data.media_relations = {
		...data.media_relations,
		media_posts: await getJson(
			fetch(`${url_new}/api/media-posts?pagination[limit]=4&populate=deep&sort[0]=created_on:desc`, {
				headers: {
					Authorization: `Bearer ${strapi_token}`
					// 'Content-Type': 'application/x-www-form-urlencoded',
				}
			})
		)
	};

	return {
		page_data: data
	};
}
