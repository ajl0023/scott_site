<script>
	export let id;
	export let i;
	let option = `stars - ${i}`;
	export let rating;
	let is_selected = option === rating;
</script>

<input
	type="radio"
	id="{i}-stars_{id}"
	class="star-input"
	name="rating_{id}"
	value="{i}"
	checked="{is_selected}"
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
