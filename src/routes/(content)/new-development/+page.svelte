<script>
	export let data;
	import _ from 'lodash-es';
	import { url_new } from '../../../lib/dev';

	const { intro_image, intro_text, developments } = data['page_data'];

</script>

<div class="wrapper">
	<div
		class="intro-container text-center lg:text-left flex font-roboto lg:space-x-2 lg:flex-nowrap lg:flex-row flex-wrap flex-col-reverse"
	>
		<span class="basis-full lg:basis-1/3 md:text-base mt-5 lg:mt-0 text-sm">
			{intro_text}
		</span>
		<div class="basis-full lg:basis-2/3 image-container">
			<img
				class="w-full object-cover block"
				src="{url_new + _.get(intro_image, 'data.attributes.url', '')}"
				alt=""
			/>
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
									<img
										class="h-full w-full object-cover"
										src="{url_new + image.attributes.url}"
										alt=""
									/>
								</div>
							{/each}
						</div>
					{/if}
					{#if youtube_url}
						<div class="vid-container not-prose bg-black w-full aspect-w-16 aspect-h-9">
							<!-- <img
								class="h-full w-full object-cover"
								src="{url_new + image.attributes.url}"
								alt=""
							/> -->
						</div>
					{/if}
				</div>
			{/each}
		{/each}
	</div>
</div>
