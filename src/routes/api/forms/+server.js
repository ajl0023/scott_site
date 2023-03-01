import { json } from '@sveltejs/kit';
import { url_new } from '../../../lib/dev';
import { getJson } from '../../../lib/utils/utils';

export async function POST({ fetch, request }) {
	// log all headers

	//fetch will send the form data to the server,so the headers are needed for forms

	const newRequest = new Request(`${url_new}/api/ezforms/submit`, {
		headers: {
			Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`,
			'Content-Type': request.headers.get('content-type')
		},
		method: 'POST',
		body: request.body,
		duplex: 'half'
	});
	const page_data = await fetch(`${url_new}/api/ezforms/submit`, newRequest);

	return;
}
