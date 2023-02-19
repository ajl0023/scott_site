<script>
	import { access_strapi_image } from '../../../lib/utils/utils';

	export let data;

	const page_data = data['page_data'];
	const { image, content } = page_data;
</script>

<div class="wrapper w-full m-auto font-roboto flex flex-col items-center prose">
	<div class="image-container mb-5">
		<img src="{access_strapi_image(image)}" alt="" />
	</div>
	<div class="text-container">
		{@html content}
	</div>
</div>
