import { browser, building, dev, version } from '$app/environment';
import fs from 'fs';
import { url_new } from '../lib/dev';

export async function load({ fetch }) {
	const getHomeData = async () => {
		const req = await fetch(`${url_new}/api/home-page?populate=deep`, {
			headers: {
				Authorization:
				`Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`
				// 'Content-Type': 'application/x-www-form-urlencoded',
			}
		});

		const json = await req.json();

		return json['data']['attributes'];
	};

	return {
		page_data: getHomeData()
	};
}
