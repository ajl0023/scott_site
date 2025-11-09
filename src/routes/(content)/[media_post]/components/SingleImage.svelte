<script>
	import { access_strapi_image, get_strapi_image_format } from '$lib/utils/utils';
	import { setContext } from 'svelte';
	export let data;
</script>

<div class="wrapper">
	<img class="m-auto" src="{get_strapi_image_format(data.image, 'large')}" alt="" />
</div>
