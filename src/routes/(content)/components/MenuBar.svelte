<script>
	import { image_url } from '../../../lib/dev';
	import Facebook from '../../../lib/images/icons/facebook.svelte';
	import Instagram from '../../../lib/images/icons/instagram.svelte';
	import Linkedin from '../../../lib/images/icons/linkedin.svelte';
	import Youtube from '../../../lib/images/icons/youtube.svelte';
	import Zillow from '../../../lib/images/icons/zillow.svelte';

	export let layout_data;

	const {
		layout_data: {
			menu_bar: {
				agent_image: {
					data: {
						attributes: { url: agentPhoto }
					}
				}
			}
		},
		socials: socials,
		services: services
	} = layout_data;
	const social_images = {
		instagram: Instagram,
		facebook: Facebook,
		linkedin: Linkedin,
		zillow: Zillow,
		youtube: Youtube
	};
	;
</script>

<div class="wrapper inline-flex">
	<div class="content-container flex-col items-center flex">
		<div class="image-container max-w-[300px] w-full">
			<img class="w-full object-contain" src="{image_url + agentPhoto}" alt="" />
		</div>
		<div class="socials-container flex items-center space-x-2 mt-4">
			{#each socials as { attributes }}
				<div class="icon-wrapper bg-[#cbcbcb] p-3 rounded-full cursor-pointer">
					<a
						class="icon-container w-[20px] h-[20px] block"
						target="_blank"
						href="{attributes.contact_info}"
						rel="noreferrer"
					>
						<svelte:component this="{social_images[attributes.contact_info_type]}" />
					</a>
				</div>
			{/each}
		</div>
		<h2 class="text-center uppercase text-[28px] font-barlow leading-[26px] mt-6 text-[#41A7C3]">
			<span class="block text-center text-span px-2">search</span>far and wide
		</h2>
		<div class="button-container font-sourceSans mt-6">
			<a
				href="https://scottjames.elliman.com/sales/usa"
				target="_blank"
				rel="noreferrer"
				class="text-white bg-[#303030] px-8 py-4 block transition-all hover:bg-[#41A7C3]"
				>DREAM HOME SEARCH</a
			>
		</div>
		<div class="services-wrapper w-full mt-9">
			{#each services as { attributes: { label, link, is_external_link }, attributes: { image: { data: image_data } } }}
				<a
					class="service-container w-full aspect-w-4 aspect-h-[1.8] relative block odd:bg-[rgba(28,28,28,0.71)] even:bg-[rgba(183,222,232,.65)] even:text-[#444242] odd:text-white"
					href="/{link}"
					target="{is_external_link ? '_blank' : ''}"
					rel="noreferrer"
				>
					<div class="image-container absolute inset-0 -z-10">
						<img
							class="object-cover grayscale w-full h-full"
							src="{image_url + image_data['attributes'].url}"
							alt=""
						/>
					</div>
					<div class="hover-line"></div>
					<div
						class="font-barlow uppercase flex items-center justify-center text-2xl font-semibold "
					>
						<span class="service-container-text inline-block py-2">{label}</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.service-container-text {
		position: relative;
		&::before {
			width: 71px;
			height: 1px;
			content: '';
			position: absolute;
			left: 0;
			right: 0;
			margin: 0 auto;
			background-color: #ffffff;
			top: 0;
			transition: all 0.2s ease-in-out;
		}
		&::after {
			width: 71px;
			height: 1px;
			content: '';
			position: absolute;
			left: 0;
			right: 0;
			margin: 0 auto;
			background-color: #ffffff;
			bottom: 0;
			transition: all 0.2s ease-in-out;
		}
	}
	.icon-wrapper {
		transition: all 0.3s ease-in-out;
		&:hover {
			background-color: #3f88d5;
		}
		&:hover {
			& :global(svg) {
				fill: white;
			}
		}
	}
	.icon-container {
		transition: all 0.3s ease-in-out;
		& :global(svg) {
			transition: all 0.3s ease-in-out;
		}
	}
	.text-span {
		position: relative;
		&::before {
			width: 40%;
			max-width: 26px;
			height: 1px;
			content: '';
			background-color: #41a7c3;
			position: absolute;
			top: 12px;
			left: 0;
		}
		&::after {
			width: 40%;
			max-width: 26px;
			height: 1px;
			content: '';
			background-color: #41a7c3;
			position: absolute;
			top: 12px;
			right: 0;
		}
	}

	.hover-line {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		margin: 0 auto;
		pointer-events: none;
		z-index: 5;

		&::before {
			left: 5px;
			bottom: 5px;
			border-left: 1px solid #ffffff;
			border-bottom: 1px solid #ffffff;
			width: 0%;
			height: 0%;

			opacity: 0;
			content: '';
			position: absolute;

			transition: all 0.3s ease-in-out;
		}
		&::after {
			width: 0%;
			height: 0%;

			top: 5px;
			right: 5px;
			border-top: 1px solid #ffffff;
			border-right: 1px solid #ffffff;

			opacity: 0;
			content: '';
			position: absolute;

			transition: all 0.3s ease-in-out;
		}
	}
	.service-container {
		&:hover {
			.hover-line {
				&::after {
					width: 40px;
					height: 40px;
					opacity: 1;
				}
				&::before {
					width: 40px;
					height: 40px;
					opacity: 1;
				}
			}
			.service-container-text {
				&::after {
					opacity: 0;
				}
				&::before {
					opacity: 0;
				}
			}
		}
	}
</style>
