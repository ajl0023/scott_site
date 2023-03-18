<script>
	import { get_strapi_image_format } from '../../../lib/utils/utils';

	export let data;
	const { main_image, main_text } = data.page_data;
</script>

<div class="wrapper">
	<div class="inline-block">
		<img src="{get_strapi_image_format(main_image, 'large')}" alt="" />
		<p class="font-roboto text-base text-center mt-5">{main_text}</p>
	</div>
</div>
