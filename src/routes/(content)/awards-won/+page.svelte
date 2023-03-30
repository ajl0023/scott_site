<script>
	import Modal from '$lib/components/Modal.svelte';
	import { get_strapi_image_format } from '$lib/utils/utils';

	export let data;
	const images = data['page_data']['awards'];
	let selectedImage = null;

	//write a function that will return the image url based on the size passed in
</script>

<div class="wrapper">
	<div class="awards-container flex flex-wrap -m-5">
		{#each images as { image: img }}
			<div class="item-wrapper md:basis-4/12 p-5 w-full">
				<div
					on:keydown
					on:click="{() =>
						(selectedImage =
							get_strapi_image_format(img, 'large') ||
							get_strapi_image_format(img, 'medium') ||
							get_strapi_image_format(img, 'small') ||
							get_strapi_image_format(img, 'thumbnail'))}"
					class="item-container border-gray-400 border-[1px] h-full flex items-center cursor-pointer"
				>
					<img
						class="w-full"
						alt=""
						src="{get_strapi_image_format(img, 'large') ||
							get_strapi_image_format(img, 'medium') ||
							get_strapi_image_format(img, 'small') ||
							get_strapi_image_format(img, 'thumbnail')}"
					/>
				</div>
			</div>
		{/each}
	</div>
</div>

<Modal
	bind:showModal="{selectedImage}"
	data="{selectedImage}"
	on:closeModal="{() => {
		selectedImage = null;
	}}"
/>
