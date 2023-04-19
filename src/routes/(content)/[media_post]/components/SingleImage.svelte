<script>
	import { access_strapi_image } from '$lib/utils/utils';
	import { setContext } from 'svelte';
	export let data;

</script>

<div class="wrapper">
	<img class="m-auto" src="{access_strapi_image(data.image)}" alt="" />
</div>
