<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { access_strapi_image } from '../utils/utils';
	import MiniLogo from './MiniLogo.svelte';

	import { getAnim } from '$lib/actions/get_anim.js';
	import _ from 'lodash-es';
	export let data;
	const { bg_photo, scott_photo, reviews } = data;
	let Carousel;

	onMount(async () => {
		Carousel = (await import('svelte-carousel')).default;
	});
</script>

<div class="wrapper overflow-hidden relative">
	<div
		class="lazy bg-banner bg-no-repeat bg-cover absolute grayscale opacity-20 w-screen top-[200px] bottom-0 left-0 translate-x-0  after:inset-0 after:absolute "
		data-bg="{access_strapi_image(bg_photo)}"
	></div>
	<div class="overflow-container m-auto z-10 relative w-full">
		<div
			class="m-auto relative z-10 max-w-[1200px] w-full flex items-center
        lg:flex-row flex-col-reverse lg:p-0"
		>
			<div
				class="w-full bg-black pt-9 lg:p-0 lg:bg-default lg:w-[50%] lg:pr-10 flex justify-center lg:justify-end relative after:absolute after:z-[2] after:w-full after:bg-black after:inset-0 after:hidden lg:after:bottom-0 lg:after:right-0 lg:after:w-screen lg:after:left-auto lg:after:block"
			>
				<div class="lg:max-w-[500px] max-w-[350px] relative z-10 lg:pt-5 lg:pr-5">
					<img
						width="749"
						height="713"
						use:getAnim="{'fade-in'}"
						src="{access_strapi_image(scott_photo)}"
						alt=""
					/>
				</div>
			</div>

			<div class="right-container lg:p-0 py-6">
				<div class="font-barlow title-container items-center lg:pl-6" use:getAnim="{'zoom-in'}">
					<div class="align-bottom text-[0] text-center lg:text-left lg:mb-2"><MiniLogo /></div>
					<h2
						class="text-header uppercase font-medium text-black-white leading-[56px] lg:text-[90px] text-[50px] relative text-center after:absolute after:h-[4px]
						after:top-1/2 after:left-[calc(100%+20px)] after:-translate-y-1/2 after:z-1 after:w-[200%] after:bg-[#b0b0b0]"
					>
						what our
					</h2>
					<span
						class="span-text lg:-mr-[50px] block text-[#41A7C3] text-[36px] font-[400] uppercase md:text-right lg:mt-3 before:hidden md:before:block text-center md:before:max-w-[450px] lg:before:max-w-[530px] lg:text-[35px]"
						>clients are saying
					</span>
				</div>
			</div>
		</div>
		<div class="testi-container text-white text-center font-roboto mt-0 relative z-10 lg:ml-5 ">
			{#if browser && Carousel}
				<div
					use:getAnim="{'fade-in-up'}"
					class="testi-content bg-[#1b1b1b] inline-block w-full lg:max-w-[772px] lg:py-[50px] lg:px-[100px] py-[20px] px-[20px] text-center relative after:hidden lg:after:absolute lg:after:bg-black lg:after:bg-opacity-75 lg:after:content-'' lg:after:w-screen lg:after:block lg:after:top-0 lg:after:bottom-0 lg:after:left-full"
				>
					{#if reviews.data.length > 0}
						<svelte:component this="{Carousel}" autoplay="{true}" dots="{false}">
							{#each reviews.data as { attributes: { content, name } }}
								<div class="review-container">
									<p class="text-sm lg:text-base">
										{content}
									</p>
									<h5 class="mt-5 italics">- {_.startCase(name)}</h5>
								</div>
							{/each}
						</svelte:component>
					{/if}

					<div class="button-container text-white mt-5 lg:mt-20 uppercase">
						<a
							class="font-mono border transition-[background-color] border-[#b3b3b3] py-5 px-10  hover:bg-[#B7DEE8] hover:border-[#b3b3b3] inline-block"
							href="/what-our-clients-are-saying">read more +</a
						>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
