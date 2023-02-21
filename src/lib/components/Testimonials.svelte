<script>
	import { onMount } from 'svelte';
	import { image_url } from '../dev';
	import MiniLogo from './MiniLogo.svelte';

	export let data;

	let agent_photo = image_url + data['scott_photo']['data']['attributes']['url'];
	let bg_photo = image_url + data['bg_photo']['data']['attributes']['url'];
</script>

<div class="wrapper overflow-hidden ">
	<div
		class="lazy bg-banner bg-no-repeat bg-cover relative grayscale opacity-20 after:inset-0 after:absolute"
		data-bg="{bg_photo}"
	></div>
	<div class="overflow-container m-auto z-10 relative w-full">
		<div
			class="m-auto relative z-10 max-w-[1200px] w-full flex items-center
        lg:flex-row flex-col-reverse p-8 lg:p-0"
		>
			<div class="max-w-[450px] lg:max-w-[520px] w-full">
				<div class="image-wrapper relative w-full">
					<div class="image-container m-auto lg:m-0  aspect-w-9 aspect-h-16">
						<img src="{agent_photo}" alt="" class="w-full z-[3] object-contain lazy" />
					</div>
				</div>
			</div>

			<div class="right-container">
				<div class="font-barlow title-container items-center lg:pl-6">
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
			<div
				class="testi-content bg-[#1b1b1b] inline-block md:w-full max-w-[872px] lg:py-[120px] lg:px-[100px] py-[20px] px-[20px] text-center"
			>
				<p class="text-sm lg:text-base">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta illum tempora officiis.
					Eligendi reprehenderit exercitationem cum nam? Hic ullam quos accusamus minima obcaecati
					veniam non minus maxime impedit eveniet! Accusantium.
				</p>
				<h5 class="mt-5 italics">- Name</h5>
				<div class="button-container text-white mt-5 lg:mt-20 uppercase">
					<a
						class="font-mono border transition-[background-color] border-[#b3b3b3] py-5 px-10  hover:bg-[#B7DEE8] hover:border-[#b3b3b3] inline-block"
						href="">read more +</a
					>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.title-wrapper {
		position: relative;
	}
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
			left: calc(100% + 60px);
			transform: translateY(-50%);
			z-index: 1;
			width: 200%;
			background-color: white;
		}
	}
	.image-wrapper {
		padding-top: 40px;
		&::after {
			background-color: black;
			position: absolute;
			z-index: 2;

			width: 100%;
			content: '';
			inset: 0;

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
