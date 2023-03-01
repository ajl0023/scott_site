<script>
	import { createEventDispatcher } from 'svelte';
	import VideoEmbed from './VideoEmbed.svelte';
	import { CloseButton } from 'flowbite-svelte';

	const dispatch = createEventDispatcher();
	export let data;
	export let showModal = false;
	export let type = 'image';
	let modal;

	function closeModal() {
		showModal = false;
	}
</script>

<div
	class="modal inset-0 {showModal ? 'flex' : 'hidden'}"
	bind:this="{modal}"
	on:keydown
	on:click="{(e) => {
		if (e.target.classList.contains('modal')) {
			closeModal();
		}
	}}"
>
	<CloseButton size='md' on:click="{() => (showModal = false)}" class='fixed top-10 right-10 text-white hover:bg-black/70'/>

	<div class="modal-content-wrapper p-4 max-w-2xl w-full">
		<div class="modal-content">
			{#if type === 'image'}
				<img class="w-auto max-h-[calc(100vh_-_215px)]" src="{data}" alt="" />
			{:else if type === 'video' && data}
				<VideoEmbed url="{data.url}" is_modal="{true}" data="{null}" />
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.modal {
		position: fixed; /* Fixed position */

		width: 100%; /* Full width */

		background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
		z-index: 9999; /* Set a high z-index */

		justify-content: center;

		align-items: center;
	}
</style>
