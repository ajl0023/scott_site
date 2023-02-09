import { url_new } from '../lib/dev';
export async function load() {
	const getLayoutData = async () => {
		console.log(`${url_new}/api/global?populate=deep`)
		const req = await fetch(`${url_new}/api/global?populate=deep`, {
			headers: {
				Authorization:
					'Bearer ***REMOVED***'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			}
		});
		const json = await req.json();
		json['data']['attributes']['navbar'].push({
			label: 'language',
			nav_options: []
		});
		return json['data']['attributes'];
	};
	return {
		layout_data: getLayoutData()
	};
}
