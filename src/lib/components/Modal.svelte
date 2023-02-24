<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let data;
	function closeModal() {
		dispatch('closeModal');
	}
</script>

<div
	class="modal inset-0"
	on:keydown
	on:click="{(e) => {
		if (e.target.classList.contains('modal')) {
			closeModal();
		}
	}}"
>
	<div class="modal-content-wrapper p-4">
		<div class="modal-content">
			<img class="w-auto max-h-[calc(100vh_-_215px)]" src="{data}" alt="" />
		</div>
	</div>
</div>

<style lang="scss">
	.modal {
		position: fixed; /* Fixed position */

		width: 100%; /* Full width */

		background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
		z-index: 9999; /* Set a high z-index */
		display: flex;
		justify-content: center;

		align-items: center;
	}
</style>
