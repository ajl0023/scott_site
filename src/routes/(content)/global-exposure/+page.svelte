<script>
	import { access_strapi_image } from '../../../lib/utils/utils';

	export let data;

	const page_data = data['page_data'];
	const { links, main_image, header, image_link, content } = page_data;
</script>

<div class="wrapper w-full m-auto font-roboto flex flex-col items-center">
	<div class="text-container mb-4">
		{@html content}
	</div>
	<div class="links-container flex justify-center space-x-4 flex-wrap">
		{#each links as link}
			<li class="font-semibold block p-3" target="_blank" rel="noreferrer" href="{link.link}">
				{link.link}
			</li>
		{/each}
	</div>
	<div class="image-container max-w-[700px] w-full">
		<img src="{access_strapi_image(main_image)}" alt="" />
	</div>
	<h4 class="font-medium text-[18px] mb-3">{header}</h4>
	<div class="image-link text-center">
		<a class="block" href="{image_link.link}">
			<div class="image-container max-w-[250px]">
				<img class="image-container w-full" src="{access_strapi_image(image_link.image)}" alt="" />
			</div>
		</a>
		<p>Click picture to view video!</p>
	</div>
</div>
