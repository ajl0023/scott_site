<script>
	// import SV_Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	import { access_strapi_image } from '$lib/utils/utils';
	import _ from 'lodash-es';
	import { onMount } from 'svelte';
	import { get_strapi_image_format } from '../../../../lib/utils/utils';
	export let data;

	const images = _.get(data, 'images.data');
	let Carousel = null;
	onMount(async () => {
		Carousel = (await import('svelte-carousel')).default;
	});
</script>

<div class="wrapper">
	{#if browser && Carousel}
		<div class="carousel-container max-w-[700px] w-full m-auto">
			<svelte:component this="{Carousel}">
				{#each images as img}
					<div class="image-container w-full">
						<img
							draggable="false"
							class="w-full select-none"
							src="{get_strapi_image_format(img, 'large')}"
							alt=""
						/>
					</div>
				{/each}
			</svelte:component>
		</div>
	{/if}
</div>
