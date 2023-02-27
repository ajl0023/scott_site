<script>
	import { access_strapi_image, get_strapi_image_format } from '../utils/utils';
	import MiniLogo from './MiniLogo.svelte';

	import { getAnim } from '$lib/actions/get_anim.js';

	export let data;
	const { image, instagram_url } = data;
</script>

<div id="hp_ig_feed_wrap" class="wrapper text-center pt-[105px] pb-[75px]">
	<div
		class="title-container md:flex-row flex flex-col  items-center md:space-x-10 justify-center"
		use:getAnim="{'zoom-in'}"
	>
		<div class="image-container w-[130px] h-[130px] md:mb-0 mb-10">
			<img class="w-full" src="{access_strapi_image(image)}" alt="" />
		</div>
		<div class="inline-block">
			<div class="font-barlow title-container items-start flex flex-col">
				<MiniLogo />
				<h2
					class="mt-3 text-header uppercase font-medium text-black leading-[56px] text-[90px] relative text-center tracking-tighter"
				>
					follow
				</h2>
				<div class="span-container w-full lg:mt-4 mt-2">
					<span class="span-text text-[#41A7C3] text-[30px] font-[500] uppercase">me</span>
				</div>
			</div>
		</div>
	</div>
	<div class="button-container mt-14 md:mt-32" use:getAnim="{'fade-in-up'}">
		<a
			class="font-roboto border transition-[background-color] border-[#b3b3b3] py-4 px-8  hover:bg-[#B7DEE8] hover:border-[#b3b3b3] inline-block text-[#1b1b1b] uppercase hover:text-black text-xs tracking-widest"
			target="{'_blank'}"
			rel="{'noreferrer'}"
			href="{'/' + instagram_url}">my instagram +</a
		>
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
