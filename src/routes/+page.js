import { browser, building, dev, version } from '$app/environment';
import fs from 'fs';

export async function load({ fetch }) {
	const getHomeData = async () => {
		const req = await fetch('http://127.0.0.1:1337/api/home-page?populate=deep', {
			headers: {
				Authorization:
					'Bearer ***REMOVED***'
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
