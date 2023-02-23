<script>
	export let data;
	import _ from 'lodash-es';
	import { onMount } from 'svelte';
	import VideoEmbed from '../../../lib/components/VideoEmbed.svelte';
	import { url_new } from '../../../lib/dev';
	import { createLazyStore } from '../../../lib/stores/lazy';
	import { get_strapi_image_format } from '../../../lib/utils/utils';

	const { intro_image, intro_text, developments } = data['page_data'];

	onMount(() => {
		createLazyStore.update_lazy();
	});
</script>

<div class="wrapper">
	<div
		class="intro-container text-center lg:text-left flex font-roboto lg:space-x-2 lg:flex-nowrap lg:flex-row flex-wrap flex-col-reverse"
	>
		<span class="basis-full lg:basis-1/3 md:text-base mt-5 lg:mt-0 text-sm">
			{intro_text}
		</span>
		<div class="basis-full lg:basis-2/3 image-container w-full">
			<div class="aspect-w-16 aspect-h-9 w-full">
				<img
					class="lazy w-full block"
					data-src="{get_strapi_image_format(intro_image, 'medium')}"
					alt=""
				/>
			</div>
		</div>
	</div>
	<div class="development-wrapper w-full max-w-full prose text-center lg:text-left">
		{#each developments as development}
			<div class="development-container">
				<h2 class="uppercase mt-20">
					Current <span class="text-[#41A7C3]">development : </span>{development.development_name}
				</h2>
			</div>
			{#each development.property_details as { address, property_images, youtube_url }}
				<div class="property-container my-20 w-full">
					<h4 class="mb-3 text-lg">{address}</h4>
					{#if property_images.data}
						<div
							class="img-wrapper w-full flex lg:space-x-2 lg:space-y-0 mb-3 lg:flex-nowrap flex-wrap space-y-5"
						>
							{#each property_images.data as image}
								<div class="img-container w-full basis-full lg:basis-1/3 not-prose">
									<div class="aspect-ratio-container w-full aspect-w-16 aspect-h-9">
										<img
											class="lazy w-full object-cover h-full block"
											data-src="{get_strapi_image_format(image, 'medium')}"
											alt=""
										/>
									</div>
								</div>
							{/each}
						</div>
					{/if}
					{#if youtube_url}
						<div class="vid-container not-prose bg-black w-full aspect-w-16 aspect-h-9">
							<VideoEmbed url="{youtube_url}" />
						</div>
					{/if}
				</div>
			{/each}
		{/each}
	</div>
</div>
