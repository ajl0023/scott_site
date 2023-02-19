<!-- https://codepen.io/chris22smith/pen/MJzLJN -->
<script>
	import Star from './Star.svelte';

	let stars = new Array(5).fill('');
	export let id;
	export let rating;
	export let active;
</script>

<div class="star-rating" class:pointer-events-none="{!active}">
	{#each stars as _, i}
		<Star rating="{rating}" i="{5 - i}" id="{id}" />
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
