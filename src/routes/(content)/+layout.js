import { url_new } from '../../lib/dev';
import { getJson, slugify } from '../../lib/utils/utils';
import _ from 'lodash-es';
import { error } from '@sveltejs/kit';
export async function load({ fetch, url }) {
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
	//catch type of page here, idk lol, for example what our clients are saying should use own page.js
	//while some other pages can just use simple content api xdddd brain gone gone oma

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

	const getLayoutData = async () => {
		const req = await fetch(`${url_new}/api/page-layout?populate=deep`, {
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`
				// 'Content-Type': 'application/x-www-form-urlencoded',
			}
		});
		const json = await req.json();

		return json['data']['attributes'];
	};

	return {
		layout_data: getLayoutData(),
		page_data: getPageData()
	};
}
