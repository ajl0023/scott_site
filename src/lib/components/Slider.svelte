<script>
	import { access_strapi_image, get_strapi_image_format } from '../utils/utils';

	export let items = [];
	let temp = [...items].map((item, i) => {
		return {
			...item,
			index: i
		};
	});
	const handleAnimationEnd = (i) => {
		const copy = [...temp];

		const first = copy.shift();
		copy.push(first);
		temp = copy;
	};
	const handleLoad = (i) => {
		// temp[0].ele.currentTime = 0;
		// temp[i].ele.play();
		// all the temp dont have to be loaded before the animation starts
	};
</script>

<div class="wrapper h-[100vh]">
	<div id="stage" class="hero slider-container h-full">
		{#each temp as { image, id, type, video_url, ele, is_playing, index }, i (id)}
			<div
				id="{index}"
				class="image-container {type === 'video' ? 'long-anim' : 'short-anim'}"
				on:animationend="{(e) => {
					handleAnimationEnd(i);
				}}"
				on:animationstart="{() => {
					is_playing = true;
					handleLoad(i);
				}}"
			>
				{#if type === 'image'}
					<img
						bind:this="{ele}"
						class="slide lazy object-cover w-full h-full object-center"
						alt="'"
						src="{access_strapi_image(image)}"
					/>{:else}
					<video
						bind:this="{ele}"
						class="slide object-cover w-full h-full object-center"
						alt="'"
						src="{video_url}"
						playsinline
						autoPlay
						muted
					>
					</video>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.slider-container {
		width: 100%;
		position: relative;
		z-index: 1;
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

	.image-container.long-anim:nth-child(1) {
		animation-name: fader;
		animation-delay: 0s;

		animation-duration: 3s;
		z-index: 20;
	}
	.image-container.short-anim:nth-child(1) {
		animation-name: fader;
		animation-delay: 0s;
		animation-duration: 3s;
		z-index: 20;
	}

	#stage .image-container:nth-child(1) {
		z-index: 10;
	}
	#stage .image-container:nth-child(n + 3) {
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
