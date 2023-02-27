<script>
	import Modal from '../../../lib/components/Modal.svelte';
	import { get_strapi_image_format } from '../../../lib/utils/utils';

	export let data;
	const images = data['page_data']['images']['data'];
	let selectedImage = null;
</script>

<div class="wrapper">
	<div class="awards-container flex w-full flex-wrap">
		{#each images as item}
			<div class="item-wrapper md:basis-4/12 p-5 w-full">
				<div
					on:keydown
					on:click="{() => (selectedImage = get_strapi_image_format(item, 'large'))}"
					class="item-container border-gray-400 border-[1px] h-full flex items-center cursor-pointer"
				>
					<img class="w-full" alt="" src="{get_strapi_image_format(item, 'medium')}" />
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
