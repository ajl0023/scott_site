<script>
	import { access_strapi_image } from '$lib/utils/utils';

	export let data;

	const page_data = data['page_data'];
	const { intro_image, intro_press_image, intro_text, press } = page_data;
</script>

<div class="wrapper w-full m-auto">
	<div class="intro-container">
		<div class="images-container flex justify-between lg:space-x-5 mb-8">
			<div class="image-container">
				<img src="{access_strapi_image(intro_image)}" alt="" />
			</div>
			<div class="image-container">
				<img src="{access_strapi_image(intro_press_image)}" alt="" />
			</div>
		</div>
		<div class="text-container font-roboto mb-10 text-center">
			{@html intro_text}
		</div>
	</div>
	<div
		class="press-wrapper grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-items-center gap-4"
	>
		{#each press as item}
			<div class="item-wrapper text-center uppercase flex flex-col w-full md:w-auto items-center">
				<div class="item-container md:w-full h-full">
					<img class="object-contain w-full" src="{access_strapi_image(item.image)}" alt="" />
				</div>
				<span class="inline-block text-[18px] font-medium mt-5">
					{item.label}
				</span>
			</div>
		{/each}
	</div>
</div>
