<script>
	export let id;
	export let i;

	export let rating_value;
	export let name;
</script>

<input
	bind:group="{rating_value}"
	type="radio"
	name="{name}"
	id="{i}-stars_{id}"
	class="star-input"
	value="stars - {i}"
/>
<label for="{i}-stars_{id}" class="star"> &#9733; </label>

<style lang="scss">
	// when the label is hovered, all elements before should be yellow

	input {
		display: none;
	}

	// .star {
	// 	color: #ccc;
	// 	cursor: pointer;
	// }

	// :global(.star) {
	// 	&:hover {
	// 		color: #ffc857;
	// 	}
	// 	color: #ccc;
	// 	cursor: pointer;
	// 	&:hover ~ .star {
	// 		color: #f9a52b !important;
	// 	}
	// }
</style>
