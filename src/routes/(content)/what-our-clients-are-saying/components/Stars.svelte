<!-- https://codepen.io/chris22smith/pen/MJzLJN -->
<script>
	import Star from './Star.svelte';

	const rating_map = {
		'stars - 5': 5,
		'stars - 4': 4,
		'stars - 3': 3,
		'stars - 2': 2,
		'stars - 1': 1
	};
	let stars = new Array(5).fill('');

	export let id;
	export let rating;
	export let active;
	export let value;

	//regex for anything thats not a number
</script>

<div class="star-rating" class:pointer-events-none="{!active}">
	{#each stars as _, i}
		{#if active}
			<Star bind:rating_value="{value}" rating="{rating}" i="{5 - i}" id="{id}" />
		{:else}
			<Star bind:rating_value="{rating}" rating="{rating}" i="{5 - i}" id="{id}" />
		{/if}
	{/each}
</div>

<style lang="scss">
	/* component */

	.star-rating {
		display: flex;
		flex-direction: row-reverse;
		font-size: 1.5em;
		justify-content: flex-end;

		text-align: center;
		width: 5em;
	}

	/* explanation */
</style>
