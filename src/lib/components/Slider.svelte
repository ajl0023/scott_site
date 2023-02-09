<script>
	export let images;
	const handleAnimationEnd = () => {
		const copy = [...images];
		let first = copy.shift();
		copy.push(first);
		images = copy;
	};
</script>

<div class="wrapper">
	<div id="stage" class="hero slider-container">
		{#each images as image, i (image.id)}
			<div
				id="{image.id}"
				class="image-container"
				on:animationend="{() => {
					handleAnimationEnd();
				}}"
			>
				<img class="slide" alt="'" src="{'http://localhost:1337' + image['attributes']['url']}" />
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.slider-container {
		width: 100%;
		position: relative;
		z-index: 1;
		height: 0;
		padding-bottom: 56.25%;
	}
	.wrapper {
		position: relative;
		&::before {
			width: 100%;
			height: 100%;
			content: '';
			position: absolute;
			z-index: 5;
			top: 0;
			left: 0;
			background-color: rgba(13, 13, 13, 0.3);
			pointer-events: none;
		}
	}
	.image-container {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		.slide {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	#stage .image-container:nth-of-type(1) {
		animation-name: fader;
		animation-delay: 0s;
		animation-duration: 3s;
		z-index: 20;
	}
	#stage .image-container:nth-of-type(2) {
		z-index: 10;
	}
	#stage .image-container:nth-of-type(n + 3) {
		display: none;
	}

	@keyframes fader {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
</style>
