<script>
	import { get_strapi_image_format } from '../../../lib/utils/utils';
	import CkContent from '../components/CkContent.svelte';

	export let data;
	const { main_image, main_text } = data.page_data;
</script>

<div class="wrapper">
	<div class="inline-block">
		<img src="{get_strapi_image_format(main_image, 'large')}" alt="" />
		<CkContent html="{main_text}" />
	</div>
</div>
