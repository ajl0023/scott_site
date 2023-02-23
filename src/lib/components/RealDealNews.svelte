<script>
	import { access_strapi_image, get_strapi_image_format } from '../utils/utils';
	import MiniLogo from './MiniLogo.svelte';
	export let data;
	export let { background_image, logo, text, link } = data;

	console.log(background_image);
</script>

<div
	data-bg="{access_strapi_image(background_image)}"
	class="lazy wrapper bg-no-repeat bg-cover bg-fixed bg-bottom pt-[90px] pb-[110px] relative"
>
	<div class="content-wrapper flex flex-col items-center p-5 z-10 relative">
		<MiniLogo />
		<div class="logo-container md:max-w-[600px] lg:max-w-[900px] w-full m-auto">
			<img class="w-full lazy" src="{access_strapi_image(logo)}" alt="" />
		</div>
		<h4
			class="uppercase font-barlow text-[25px] md:text-[40px] text-white font-medium mt-5 text-center"
		>
			{text}
		</h4>
		<div class="button-container mt-14">
			<a
				class="font-roboto border transition-[background-color] border-[#b3b3b3] py-4 px-8  hover:bg-[#B7DEE8] hover:border-[#b3b3b3] inline-block text-[white] uppercase hover:text-black text-xs tracking-widest"
				target="{'_blank'}"
				rel="{'noreferrer'}"
				href="{'/' + link}">visit site +</a
			>
		</div>
	</div>
</div>

<style lang="scss">
	.wrapper {
		&::before {
			width: 100%;
			height: 100%;
			content: '';
			position: absolute;
			top: 0;
			z-index: 1;
			left: 0;
			background-color: rgba(21, 21, 21, 0.85);
		}
	}
</style>
