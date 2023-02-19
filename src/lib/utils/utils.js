import _ from 'lodash-es';
import { image_url } from '../dev';
export async function getJson(fetch) {
	const req = await fetch;
	const data = await req.json();
	return data;
}
export const slugify = (string) => {
	// Remove leading and trailing slashes
	string = string.replace(/^\/|\/$/g, '');

	// Replace remaining slashes with a hyphen
	string = string.replace(/\//g, '-');

	// Replace any non-alphanumeric characters with an empty string
	string = string.replace(/[^a-z0-9-]/gi, '');

	// Convert the slug to lowercase
	string = string.toLowerCase();

	// Return the resulting slug
	return string;
};
export const access_strapi_image = (img) => {
	return _.get(img, 'data.attributes.url', null)
		? image_url + _.get(img, 'data.attributes.url', null)
		: image_url + _.get(img, 'attributes.url', null);
};
