<script>
	import { access_strapi_image } from '../utils/utils';
	import MiniLogo from './MiniLogo.svelte';
	import { getAnim } from '$lib/actions/get_anim.js';
	export let data;
</script>

<div class="wrapper  pt-[105px] pb-[75px]">
	<div class="content-wrapper flex justify-center p-3">
		<div class="inline-block" use:getAnim="{'zoom-in'}">
			<div class="font-barlow title-container items-start flex flex-col">
				<MiniLogo />
				<h2
					class="mt-4 text-header uppercase font-medium text-black leading-[56px] text-[90px] relative text-center"
				>
					future
				</h2>
				<div class="span-container w-full mt-4">
					<span class="span-text text-[#41A7C3] text-[30px] font-[500] uppercase">projects</span>
				</div>
			</div>
		</div>
	</div>
	<div
		class="projects-container flex max-w-[600px] md:max-w-[1100px] w-full m-auto flex-wrap"
		use:getAnim="{'fade-in-up'}"
	>
		{#each data as { description, image, link }}
			<div class="item-container w-full md:w-[50%] p-4">
				<div class="image-container aspect-w-16 aspect-h-9">
					<img class="object-cover lazy" data-src="{access_strapi_image(image)}" alt="" />
				</div>
				<div class="description-container font-roboto mt-5">
					<p class="text-[#1b1b1b] text-[14px] font-[400]">{description}</p>
				</div>

				{#if link}
					<div class="button-container mt-5">
						<a
							class="font-roboto border transition-[background-color] border-[#b3b3b3] py-4 px-8  hover:bg-[#B7DEE8] hover:border-[#b3b3b3] inline-block text-[#1b1b1b] uppercase hover:text-black text-xs tracking-widest"
							target="{'_blank'}"
							rel="{'noreferrer'}"
							href="{link}"
						>
							read more +
						</a>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.span-container {
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: space-between;
		&::before {
			width: 100%;
			margin-right: 10px;
			display: block;
			height: 4px;

			content: '';

			background-color: #818181;
		}
	}
</style>
