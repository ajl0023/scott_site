<script>
	import { onMount } from 'svelte';
	import { image_url } from '../dev';
	import { browser } from '$app/environment';
	import { access_strapi_image, get_strapi_image_format } from '../utils/utils';
	import MiniLogo from './MiniLogo.svelte';

	import _ from 'lodash-es';
	import { getAnim } from '$lib/actions/get_anim.js';
	export let data;
	const { bg_photo, scott_photo, reviews } = data;
	let Carousel;
	onMount(async () => {
		Carousel = (await import('svelte-carousel')).default;

	
	});
</script>

<div class="wrapper overflow-hidden ">
	<div
		class="lazy bg-banner bg-no-repeat bg-cover relative grayscale opacity-20 after:inset-0 after:absolute"
		data-bg="{access_strapi_image(bg_photo)}"
	></div>
	<div class="overflow-container m-auto z-10 relative w-full">
		<div
			class="m-auto relative z-10 max-w-[1200px] w-full flex items-center
        lg:flex-row flex-col-reverse lg:p-0"
		>
			<div
				class="w-full bg-black pt-9 lg:p-0 lg:bg-default lg:w-[50%] lg:pr-10 flex justify-center lg:justify-end image-wrapper relative"
			>
				<div class="lg:max-w-[500px] max-w-[300px] relative z-10 lg:pt-5 lg:pr-5">
					<img
						width="417"
						height="853"
						use:getAnim="{'fade-in'}"
						src="{access_strapi_image(scott_photo)}"
						alt=""
					/>
				</div>
			</div>

			<div class="right-container lg:p-0 py-6">
				<div class="font-barlow title-container items-center lg:pl-6" use:getAnim="{'zoom-in'}">
					<div class="align-bottom text-[0] text-center lg:text-left"><MiniLogo /></div>
					<h2
						class="text-header uppercase font-medium text-black-white leading-[56px] lg:text-[90px] text-[50px] relative text-center"
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
		<div
			class="testi-container text-white text-center font-roboto lg:-mt-48 mt-0 relative z-10 lg:ml-5 "
		>
			{#if browser && Carousel}
				<div
					use:getAnim="{'fade-in-up'}"
					class="testi-content bg-[#1b1b1b] inline-block w-full lg:max-w-[872px] lg:py-[120px] lg:px-[100px] py-[20px] px-[20px] text-center"
				>
					<Carousel autoplay="{true}" dots="{false}">
						{#each reviews.data as { attributes: { content, name } }}
							<div class="review-container">
								<p class="text-sm lg:text-base">
									{content}
								</p>
								<h5 class="mt-5 italics">- {_.startCase(name)}</h5>
							</div>
						{/each}
					</Carousel>

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

<style lang="postcss">
	.testi-content {
		position: relative;
		&::after {
			display: none;
			@screen lg {
				background-color: rgba(0, 0, 0, 0.75);
				position: absolute;
				content: '';
				width: 100vw;
				display: block;
				top: 0;
				bottom: 0;
				left: 100%;
			}
		}
	}
	.rev-container {
		position: relative;
		&::after {
			background-color: black;
			position: absolute;
			content: '';
			width: 100vw;
			top: 0px;
			bottom: 0;
			left: 0;
		}
	}
	.wrapper {
		position: relative;
		.bg-banner {
			content: '';
			position: absolute;
			width: 100vw;
			top: 200px;
			bottom: 0;
			left: 0;
			transform: translateX(0px);
		}
	}
	.text-header {
		&::after {
			content: '';
			position: absolute;
			height: 4px;
			content: '';
			top: 50%;
			left: calc(100% + 20px);
			transform: translateY(-50%);
			z-index: 1;
			width: 200%;
			background-color: #b0b0b0;
		}
	}
	.image-wrapper {
		&::after {
			position: absolute;
			z-index: 2;
			width: 100%;
			content: '';
			background: black;
			inset: 0;
			display: none;
			z-index: 1;
			@screen lg {
				bottom: 0;
				right: 0;
				width: 100vw;
				left: auto;
				display: block;
			}
		}
	}
</style>
