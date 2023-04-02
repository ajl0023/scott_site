import { dev } from '$app/environment';

let test_prod = true;
let dev_test = !dev ? false : test_prod ? false : true;

export const image_url = dev_test
	? import.meta.env.VITE_DEV_SERVER_URL
	: import.meta.env.VITE_PROD_SERVER_URL;
export const url_new = dev_test
	? import.meta.env.VITE_DEV_SERVER_URL
	: import.meta.env.VITE_PROD_SERVER_URL;

export const strapi_token = dev_test
	? import.meta.env.VITE_STRAPI_DEV_TOKEN
	: import.meta.env.VITE_STRAPI_TOKEN;
