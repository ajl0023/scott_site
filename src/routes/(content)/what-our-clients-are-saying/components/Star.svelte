<script>
	export let id;
	export let i;

	export let rating;

	export let rating_value;

	console.log(rating_value);
</script>

<input
	bind:group="{rating_value}"
	type="radio"
	id="{i}-stars_{id}"
	class="star-input"
	name="rating_{id}"
	value="stars - {i}"
/>
<label for="{i}-stars_{id}" class="star">&#9733;</label>

<style lang="scss">
	input {
		display: none;
	}

	:global(.star) {
		&:hover {
			color: #ffc857;
		}
		color: #ccc;
		cursor: pointer;
		&:hover ~ .star {
			color: #f9a52b;
		}
	}

	.star-input {
		&:checked ~ .star {
			color: #f9a52b;
		}
		&:checked {
			.star {
				font-size: 40px;
			}
		}
	}
</style>
