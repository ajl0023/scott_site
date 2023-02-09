export async function load() {
	const getLayoutData = async () => {
		const req = await fetch('http://127.0.0.1:1337/api/global?populate=deep', {
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
