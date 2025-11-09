<script>
	import { get_strapi_image_format, access_strapi_image } from '../utils/utils';
	import MiniLogo from './MiniLogo.svelte';
	import { browser, dev } from '$app/environment';
	import { onMount } from 'svelte';

	export let data;
	export let { background_image, logo, link, main_text, image_slider } = data;

	let Carousel;
	let carousel;
	let mounted = false;

	let itemsPerSlide = 9; // default

	let carouselModuleLoaded = false;
	let currentPageIndex = 0;
	// Dynamically import the carousel only in browser
	onMount(async () => {
		if (!browser) return;
		Carousel = (await import('svelte-carousel')).default;
		mounted = true;
		carouselModuleLoaded = true;
		// Responsive behavior

		updateItemsPerSlide();
	});

	// Dev-only test data

	// if (dev) {
	// 	let testData = Array.from({ length: 8 }, (_, i) => ({
	// 		...structuredClone(image_slider[0]),
	// 		id: `test-image-${i + 1}`
	// 	}));
	// 	// image_slider = testData;
	// }
	let resizeTimeout;
	const onResize = () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(updateItemsPerSlide, 300);
	};
	const updateItemsPerSlide = () => {
		if (!browser) return;
		if (!carouselModuleLoaded) return;

		if (window.matchMedia('(max-width: 640px)').matches) {
			itemsPerSlide = 2;
		} else if (window.matchMedia('(max-width: 1024px)').matches) {
			itemsPerSlide = 4;
		} else {
			itemsPerSlide = 6;
		}
		if (carousel) {
			carousel.goTo(0);
			console.log(currentPageIndex);
			console.log(itemsPerSlide);
		}
	};
</script>

<svelte:window on:resize="{onResize}" />
<div
	data-bg="{get_strapi_image_format(background_image, 'large')}"
	class="lazy wrapper bg-no-repeat bg-cover bg-fixed bg-bottom pt-[90px] pb-[110px] relative"
>
	<div class="content-wrapper flex flex-col items-center p-5 z-10 relative">
		<div class="logo-container md:max-w-[600px] lg:max-w-[900px] w-full m-auto">
			<img class="w-full lazy" src="{access_strapi_image(logo)}" alt="" />
		</div>

		<div class="font-barlow title-container lg:items-start flex flex-col md:mb-3 items-center">
			<MiniLogo color="white" />

			<div class="header-container">
				<h2
					class="md:mt-4 mt-2 text-header uppercase font-[600] text-white leading-[56px] md:text-[130px] text-[90px] relative text-center"
				>
					Altadena
				</h2>
			</div>
			<div class="span-container w-full md:mt-4 mt-2 lg:text-end">
				<span class="span-text text-[#41A7C3] text-[30px] md:text-[70px] font-[400] uppercase">
					Rebuild
				</span>
			</div>
		</div>

		<h5
			class="text-center text-white font-[300] 
	md:text-[20px] sm:text-[20px]
	md:leading-[36px] leading-[28px] 
	max-w-[800px] mx-auto px-4"
		>
			{main_text}
		</h5>

		{#if browser && carouselModuleLoaded && Carousel}
			{#key itemsPerSlide}
				<div class="carousel-wrapper w-full max-w-[1100px] mt-5">
					<svelte:component
						this="{Carousel}"
						let:currentPageIndex
						particlesToShow="{itemsPerSlide}"
						let:showPrevPage
						let:showNextPage
						let:loaded
						dots="{false}"
						bind:this="{carousel}"
					>
						<div
							on:click="{showPrevPage}"
							slot="prev"
							class="cursor-pointer arrow-container absolute top-[50%] translate-y-[-50%] left-[-50px] z-10 bg-black rounded-full"
						>
							<svg
								class="arrow"
								xmlns="http://www.w3.org/2000/svg"
								width="30"
								height="30"
								viewBox="0 0 24 24"
								fill="none"
								stroke="white"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M15 18l-6-6 6-6"></path>
							</svg>
						</div>

						{#each image_slider as image, imageIndex (image.id)}
							<div class="image-wrapper relative px-2">
								<div class="aspect-w-8 aspect-h-12 w-full">
									{#if loaded.includes(imageIndex)}
										<img
											draggable="{false}"
											class="object-cover w-full"
											src="{get_strapi_image_format(image.media, 'large')}"
											alt="{image.alt}"
										/>
									{/if}
								</div>
							</div>
						{/each}

						<div
							on:click="{showNextPage}"
							slot="next"
							class="cursor-pointer arrow-container absolute top-[50%] translate-y-[-50%] right-[-50px] z-10 rotate-180 bg-black rounded-full"
						>
							<svg
								class="arrow"
								xmlns="http://www.w3.org/2000/svg"
								width="30"
								height="30"
								viewBox="0 0 24 24"
								fill="none"
								stroke="white"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M15 18l-6-6 6-6"></path>
							</svg>
						</div>
					</svelte:component>
				</div>
			{/key}
		{/if}

		<div class="button-container mt-5">
			<a
				class="font-roboto border transition-[background-color] border-[#b3b3b3] py-4 px-8 hover:bg-[#B7DEE8] hover:border-[#b3b3b3] inline-block text-[white] uppercase hover:text-black text-xs tracking-widest"
				rel="{'noreferrer'}"
				href=""
			>
				Coming Soon +
			</a>
		</div>
	</div>
</div>

<style lang="scss">
	.wrapper {
		font-family: 'Barlow Semi Condensed', sans-serif;
		&::before {
			width: 100%;
			height: 100%;
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
			background-color: rgba(21, 21, 21, 0.85);
		}
	}
</style>
