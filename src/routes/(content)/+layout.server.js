import { url_new } from '../../lib/dev';
import { getJson, slugify } from '../../lib/utils/utils';
import _ from 'lodash-es';
import { error } from '@sveltejs/kit';
export const prerender = true;
export async function load({ fetch, url, params }) {
	let path = url.pathname;
	const slug = slugify(path);
	const is_listing = params['address'] && params['id'];

	const page_info = await getJson(
		fetch(`${url_new}/api/pages?filters[slug][$eq]=${slug}`, {
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`
			}
		})
	);

	const { api_url } = _.get(page_info, 'data[0].attributes', {});

	if (!api_url && !is_listing) {
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

		return Array.isArray(page_data.data) ? page_data : page_data.data['attributes'];
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
	//this checks if the page is a listing page, if it is, it will only return the layout data, because the listing page is a dynamic page, and the other pages are static pages that can be pre-rendered

	// other pages might also be dynamic, but they are not yet, so we will have to add them to the if statement, i should probably check the url based off the slug instead of the params, but this works for now
	if (is_listing) {
		return {
			layout_data: getLayoutData()
		};
	}
	return {
		layout_data: getLayoutData(),
		page_data: getPageData()
	};
}
