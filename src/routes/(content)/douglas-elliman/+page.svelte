<script>
	import { access_strapi_image } from '../../../lib/utils/utils';

	export let data;

	const page_data = data['page_data'];
	const { image, content } = page_data;
</script>

<div class="wrapper w-full font-roboto flex flex-col items-center prose-base">
	<div class="text-container">
		{@html content}
	</div>
</div>
