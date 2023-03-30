<script>
	import Modal from '$lib/components/Modal.svelte';
	
	import { access_strapi_image, get_strapi_image_format } from '$lib/utils/utils';

	export let data;

	const page_data = data['page_data'];
	const {
		links,
		main_image,
		header,
		image_link,
		content,
		media_logo,
		media_text,
		video_collection
	} = page_data;
	let selected;
</script>

<div class="wrapper w-full m-auto font-roboto flex flex-col items-center">
	<div class="text-container mb-4">
		{@html content}
	</div>
	<div class="links-container flex justify-center space-x-4 flex-wrap">
		{#each links as link}
			<li class="font-semibold block p-3" target="_blank" rel="noreferrer">
				<a href="{link.link}">{link.link}</a>
			</li>
		{/each}
	</div>
	<div class="image-container max-w-[700px] w-full">
		<img src="{access_strapi_image(main_image)}" alt="" />
	</div>
	<h4 class="font-medium text-[18px] mb-3">{header}</h4>

	<div class="flex lg:flex-row flex-col justify-center items-center mt-10">
		<div class="max-w-[100px] shrink-0">
			<img class="w-full" src="{get_strapi_image_format(media_logo)}" alt="" />
		</div>
		<p class="px-7 mt-10 lg:mt-0">
			{media_text}
		</p>
	</div>

	<div class="video-collection-wrapper mt-7 w-full">
		<span class="text-center block font-semibold text-lg">Video Collection</span>
		<div class="flex-wrap flex justify-center">
			{#each video_collection as video}
				<div class="video-container max-w-lg w-full p-2 basis-1/2 min-w-[250px] flex-grow relative">
					<div
						on:keydown="{() => (selected = video)}"
						on:click="{() => (selected = video)}"
						class="cursor-pointer aspect-w-16 aspect-h-9  before:content before:bg-[rgb(0,0,0)]/40 before:absolute before:inset-0 before:z-10
						"
					>
						<img
							class="w-full h-full object-cover lazy"
							data-src="{get_strapi_image_format(video.image, 'small')}"
							alt=""
						/>
					</div>
					<div
						class="
						cursor-pointer

						w-10 h-10
						flex justify-center items-center
						absolute
						z-20
						rounded-full border-white border-2
						top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
						
						icon-container after:content-['\b0087'] after:text-white after:font-agentImage_icon"
					></div>
				</div>
			{/each}
			{#if video_collection.length % 2 !== 0}
				<div class="video-container max-w-lg w-full p-2 basis-1/2 min-w-[200px] h-0">
					<div class="aspect-w-16 aspect-h-9"></div>
				</div>
			{/if}
		</div>
	</div>
	<!-- 
	<div class="image-link text-center">
		<a class="block" href="{image_link.link}">
			<div class="image-container max-w-[250px]">
				<img class="image-container w-full" src="{access_strapi_image(image_link.image)}" alt="" />
			</div>
		</a>
		<p>Click picture to view video!</p>
	</div> -->
</div>
<Modal bind:showModal="{selected}" type="video" data="{selected}" />
