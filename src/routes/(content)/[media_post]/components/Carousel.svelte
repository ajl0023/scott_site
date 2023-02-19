<script>
	import SV_Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	import _ from 'lodash-es';
	import { access_strapi_image } from '$lib/utils/utils';
	export let data;

	const images = _.get(data, 'images.data');
</script>

<div class="wrapper">
	{#if browser}
		<div class="carousel-container max-w-[700px] w-full m-auto">
			<SV_Carousel>
				{#each images as img}
					<div class="image-container w-full">
						<img
							draggable="false"
							class="w-full select-none"
							src="{access_strapi_image(img)}"
							alt=""
						/>
					</div>
				{/each}
			</SV_Carousel>
		</div>
	{/if}
</div>
