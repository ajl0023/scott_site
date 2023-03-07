<script>
	import { access_strapi_image, get_strapi_image_format } from '../utils/utils';
	import MiniLogo from './MiniLogo.svelte';
	import { getAnim } from '$lib/actions/get_anim.js';

	export let data; // this is the data from strapi for the page

	const text_content = data['content'];
	const media_posts = data['media_posts']['data'];
</script>

<!-- the div below will have a black backdrop -->
<div
	data-bg="{get_strapi_image_format(data['background_photo'], 'large')}"
	class="wrapper bg-no-repeat bg-cover bg-fixed bg-bottom lazy"
>
	<div
		class="inner-content relative z-10 flex w-full max-w-[1400px] m-auto font-sourceSans flex-col lg:flex-row"
	>
		<div
			class="left-container flex items-center w-full lg:w-[30%] p-5"
			use:getAnim="{'fade-in-left'}"
		>
			<div class="left-container-content flex flex-col items-center lg:items-start">
				<div class="font-barlow title-container items-start flex flex-col ">
					<div class="lg:mb-2">
						<MiniLogo color="white" />
					</div>
					<h2
						class="text-header uppercase font-medium text-white leading-[56px] lg:text-[90px] text-[50px] relative text-center"
					>
						Media
					</h2>
					<div class="span-container  pl-[50px]">
						<span
							class="span-text block text-[#41A7C3] text-[36px] font-[400] uppercase lg:text-[35px]"
							>Relations
						</span>
					</div>
				</div>
				<div class="text-container text-white lg:text-left text-center">
					<p class="">
						{text_content}
					</p>
				</div>

				<div class="button-container text-white mt-5 lg:mt-20 uppercase">
					<a
						class="font-mono border transition-[background-color] border-[#b3b3b3] py-5 px-10  hover:bg-[#B7DEE8] hover:border-[#b3b3b3] inline-block hover:text-black"
						href="/category/media-relations">explore more +</a
					>
				</div>
			</div>
		</div>
		<div class="right-container flex flex-wrap lg:w-[70%]" use:getAnim="{'fade-in-right'}">
			{#each media_posts as { attributes: { title, image, is_external_link, link } }}
				<a
					target="{is_external_link ? '_blank' : ''}"
					rel="{is_external_link ? 'noreferrer' : ''}"
					href="{is_external_link ? link : '/' + link}"
					class="aspect-wrapper flex flex-wrap md:w-[50%] w-full bg-no-repeat bg-cover bg-center lazy"
					data-bg="{access_strapi_image(image)}"
				>
					<div class="item-container  aspect-w-1 aspect-h-1 w-full">
						<div class="content-wrapper">
							<div
								class="content-container bottom-0 absolute w-full bg-[rgb(0,0,0)]/80 flex flex-col items-center p-4 h-[50%] justify-center"
							>
								<span
									class="line-clamp-2 text-white text-center uppercase text-[22px] lg:text-[24px] mb-4 font-sourceSans leading-6"
								>
									{title}
								</span>
								<a
									class="font-mono border transition-[background-color] border-[#b3b3b3] py-4 px-8  hover:bg-[#B7DEE8] hover:border-[#b3b3b3] inline-block text-white uppercase hover:text-black"
									target="{is_external_link ? '_blank' : ''}"
									rel="{is_external_link ? 'noreferrer' : ''}"
									href="{is_external_link ? link : '/' + link}">Read more +</a
								>
							</div>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	//the div below will have a black backdrop
	.wrapper {
		position: relative;
		&::before {
			width: 100%;
			z-index: -1;
			background: rgba(0, 0, 0, 0.5);

			content: '';
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;

			z-index: 1;

			pointer-events: none;
		}
	}
	.span-container {
		display: flex;
		align-items: center;
		width: 100%;
		span {
			position: relative;
			&::before {
				top: 50%;
				transform: translateY(50%);
				width: 100vw;
				position: absolute;
				display: block;
				height: 4px;
				right: 100%;
				content: '';

				margin-right: 10px;
				background-color: #818181;
			}
		}
	}
	.logo-container {
		&::after {
			width: 38px;
			height: 5px;
			content: '';
			position: absolute;
			bottom: 13px;
			right: 0;
			background-color: #41a7c3;
		}
	}
</style>
