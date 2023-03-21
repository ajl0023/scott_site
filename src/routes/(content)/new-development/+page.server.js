import _ from 'lodash-es';
import { error } from '@sveltejs/kit';
import { getJson, slugify } from '../../../lib/utils/utils';
import { url_new } from '../../../lib/dev';
export async function load({ fetch, params, depends, url }) {
	let path = url.pathname;
	const slug = slugify(path);

	const page_info = await getJson(
		fetch(`${url_new}/api/pages?filters[slug][$eq]=${slug}`, {
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`
			}
		})
	);

	const { api_url } = _.get(page_info, 'data[0].attributes', {});
	if (!api_url) {
		throw error(404);
	}

	const getPageData = async () => {
		const page_data = await getJson(
			fetch(`${url_new}/api/${api_url}?populate=deep`, {
				headers: {
					Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`
				}
			})
		);

		return page_data.data['attributes'];
	};

	return {
		page_data: getPageData()
	};
}
