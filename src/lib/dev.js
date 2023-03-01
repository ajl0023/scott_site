import { dev } from '$app/environment';
export const url_new = dev ? VITE_DEV_SERVER_URL : VITE_PROD_SERVER_URL;
export const image_url = url_new;
