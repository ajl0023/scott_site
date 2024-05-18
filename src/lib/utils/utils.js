import _ from 'lodash-es';
import { image_url } from '../dev';
export async function getJson(fetch) {
	const req = await fetch;
	const data = await req.json();
	return data;
}
export function parseIfTruthy(str) {
	return str ? Number(str) : null;
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

export const slugify_address = (address) => {
	//slugify address, that considers the address as a single string
	//remove all special characters
	const slug = address.replace(/[^a-zA-Z0-9 ]/g, '');
	//remove all spaces
	return slug.replace(/\s/g, '-');
};
export const access_strapi_image = (img) => {
	return _.get(img, 'data.attributes.url', null)
		? image_url + _.get(img, 'data.attributes.url', null)
		: image_url + _.get(img, 'attributes.url', null);
};
export const get_strapi_image_format = (img, format) => {
	const formats = _.get(img, 'data.attributes.formats', null)
		? _.get(img, 'data.attributes.formats', null)
		: _.get(img, 'attributes.formats', null);

	if (Object.keys(formats).length === 1) return access_strapi_image(img);
	return formats && formats[format] ? image_url + formats[format].url : null;
};
// Convert state to abbreviation, the keys will be the state names and the values will be the abbreviations
//the state names are lowercase and with spaces not included (i.e. "new york" is "newyork")
export const stateToAbbr = (state) => {
	const states = {
		alabama: 'AL',
		alaska: 'AK',
		arizona: 'AZ',
		arkansas: 'AR',
		california: 'CA',
		colorado: 'CO',
		connecticut: 'CT',
		delaware: 'DE',
		florida: 'FL',
		georgia: 'GA',
		hawaii: 'HI',
		idaho: 'ID',
		illinois: 'IL',
		indiana: 'IN',
		iowa: 'IA',
		kansas: 'KS',
		kentucky: 'KY',
		louisiana: 'LA',
		maine: 'ME',
		maryland: 'MD',
		massachusetts: 'MA',
		michigan: 'MI',
		minnesota: 'MN',
		mississippi: 'MS',
		missouri: 'MO',
		montana: 'MT',
		nebraska: 'NE',
		nevada: 'NV',
		newhampshire: 'NH',
		newjersey: 'NJ',
		newmexico: 'NM',
		newyork: 'NY',
		northcarolina: 'NC',
		northdakota: 'ND',
		ohio: 'OH',
		oklahoma: 'OK',
		oregon: 'OR',
		pennsylvania: 'PA',
		rhodeisland: 'RI',
		southcarolina: 'SC',
		southdakota: 'SD',
		tennessee: 'TN',
		texas: 'TX',
		utah: 'UT',
		vermont: 'VT',
		virginia: 'VA',
		washington: 'WA',
		westvirginia: 'WV',
		wisconsin: 'WI',
		wyoming: 'WY'
	};
	return state && states[state.toLowerCase()] ? states[state.toLowerCase()] : state;
};
