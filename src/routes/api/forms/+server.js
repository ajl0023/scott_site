import { strapi_token, url_new } from '$lib/dev';
import { getJson } from '$lib/utils/utils';
import { json } from '@sveltejs/kit';

export async function POST({ fetch, request, url }) {
	// log all headers

	//fetch will send the form data to the server,so the headers are needed for forms

	const newRequest = new Request(`${url_new}/api/ezforms/submit`, {
		headers: {
			Authorization: `Bearer ${strapi_token}`,
			'Content-Type': request.headers.get('content-type')
		},
		method: 'POST',
		body: request.body,
		duplex: 'half'
	});
	const page_data = await fetch(newRequest);
	//get query formName from url

	const formName = url.searchParams.get('formName');
	const data = await getJson(page_data);
	if (formName === 'review_form') {
		await fetch(url_new + '/api/reviews', {
			method: 'POST',
			body: JSON.stringify({ data }),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${strapi_token}`
			}
		})
			.then((response) => {
				return response;
			})
			.catch((error) => {
				console.error(error);
			});
	}
	return json(data);
}
