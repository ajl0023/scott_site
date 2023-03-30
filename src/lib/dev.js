import { dev } from '$app/environment';

export const image_url = dev
	? import.meta.env.VITE_DEV_SERVER_URL
	: import.meta.env.VITE_PROD_SERVER_URL;
export const url_new = dev
	? import.meta.env.VITE_DEV_SERVER_URL
	: import.meta.env.VITE_PROD_SERVER_URL;
export const strapi_token = dev
	? import.meta.env.VITE_STRAPI_DEV_TOKEN
	: import.meta.env.VITE_STRAPI_TOKEN;
