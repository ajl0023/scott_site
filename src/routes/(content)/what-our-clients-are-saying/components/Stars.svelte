<!-- https://codepen.io/chris22smith/pen/MJzLJN -->
<script>
	import Star from './Star.svelte';

	// const rating_map = {
	// 	'stars - 5': 5,
	// 	'stars - 4': 4,
	// 	'stars - 3': 3,
	// 	'stars - 2': 2,
	// 	'stars - 1': 1
	// };
	let stars = new Array(5).fill('');

	export let id;
	export let rating;
	export let active;
	export let value;
	export let name;
	export let disabled;
	//regex for anything thats not a number
</script>

<fieldset class="star-rating" class:pointer-events-none="{!active}" disabled="{disabled}">
	{#each stars as _, i}
		{#if active}
			<Star
				active="{true}"
				name="{name}"
				bind:rating_value="{value}"
				rating="{rating}"
				i="{5 - i}"
				id="{id}"
			/>
		{:else}
			<Star bind:rating_value="{rating}" active="{false}" rating="{rating}" i="{5 - i}" id="{id}" />
		{/if}
	{/each}
</fieldset>

<style lang="scss">
	:global(.star) {
		&:hover {
			color: #ffc857;
		}
		color: #ccc;
		cursor: pointer;
		//this doesnt work
		// &:hover ~ .star {
		// 	color: #f9a52b !important;
		// }
		// .star-input:checked ~ .star {
		// 	color: #f9a52b;
		// }
	}
	//this works
	:global(.star:hover ~ .star) {
		color: #f9a52b;
	}
	:global(.star-input:checked ~ .star) {
		color: #f9a52b;
	}
	.star-rating {
		display: flex;
		flex-direction: row-reverse;
		font-size: 1.5em;
		line-height: 1;
		justify-content: flex-end;

		text-align: center;
		width: 5em;

		&:disabled {
			pointer-events: none;
			opacity: 0.5;
		}
	}

	/* explanation */
</style>
