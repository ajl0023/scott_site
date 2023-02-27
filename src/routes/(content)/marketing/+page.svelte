<script>
	import { access_strapi_image } from '../../../lib/utils/utils';
	import CkContent from '../components/CKContent.svelte';

	export let data;

	const page_data = data['page_data'];
	const { content, links, navigation_menu } = page_data;
</script>

<div class="wrapper w-full m-auto">
	<CkContent html="{content}" />
	<div
		class="button-container flex justify-center mt-10 md:space-x-5 md:flex-row flex-col items-center md:space-y-0 space-y-5"
	>
		{#each links as link}
			<div class="button-space-container pl-[25px]">
				<a
					class="block button uppercase text-center border-2 border-black w-[300px] py-3 transition-all "
					href="{link.link}"
					><span class="font-normal">
						{link.label} +
					</span></a
				>
			</div>
		{/each}
	</div>
	<div class="menu-wrapper text-center flex justify-center w-full mt-9">
		<div
			class="flex-container flex flex-col flex-nowrap md:flex-row md:flex-wrap m-auto w-full items-center md:items-baseline md:max-w-[700px]"
		>
			{#each navigation_menu as nav_item}
				<a href="/{nav_item.link}" class="group block w-[300px] md:w-4/12 link-container p-1">
					<div class="item-container transition-all relative flex justify-center items-center">
						<div
							class="bg-container w-full aspect-w-6 aspect-h-6 md:aspect-w-16 md:aspect-h-16 flex justify-center items-center"
						>
							<div
								class="p-2 transition-all icon-container z-[11] group-even:bg-[rgba(183,222,232)]/50 group-odd:bg-[rgb(38,37,42)]/50 group-hover:group-even:bg-[rgba(183,222,232)]/20 group-hover:group-odd:bg-[rgb(38,37,42)]/20 flex-col text-white uppercase"
							>
								<div
									class=" transition-all backdrop group-hover:bg-[rgb(0,0,0)]/10  bg-[rgb(0,0,0)]/50 absolute inset-0 -z-10"
								></div>
								<div
									class="item-content z-10 flex items-center justify-center w-full flex-col h-full"
								>
									<img
										class="object-contain w-[25%]"
										src="{access_strapi_image(nav_item.icon)}"
										alt=""
									/>
									<span class="line-clamp-2 font-medium mt-5">
										{nav_item.label}
									</span>
								</div>
							</div>

							<div
								style="background-image:url({access_strapi_image(nav_item['bg_image'])})"
								class="grayscale group-hover:grayscale-0 transition-all bg-no-repeat bg-cover"
							></div>
						</div>
					</div></a
				>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	// .link-container {
	// 	&:nth-child(odd) {
	// 		.icon-container {
	// 			background-color: rgba(38, 37, 42, 0.84);
	// 		}
	// 	}
	// 	&:nth-child(even) {
	// 		.icon-container {
	// 			background-color: rgba(183, 222, 232, 0.84);
	// 		}
	// 	}
	// }
	.button {
		position: relative;
		&:before {
			content: '';
			background-color: #666666;
			width: 50px;
			height: 1px;
			position: absolute;
			left: -25px;
			top: 0;
			bottom: 0;
			margin: auto;
		}
		&:hover {
			color: white;
			background-color: #41a7c3;
		}
	}
</style>
