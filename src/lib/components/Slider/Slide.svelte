<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { access_strapi_image } from '../../utils/utils';
	import { animStore } from './store';
	import classnames from 'classnames';
	export let index;
	export let slide_type;
	export let media;
	export let id;
	let should_animate;
	let video;
	const dispatch = createEventDispatcher('ease_video');

	// a video starts playing, when the video finishes it starts the animation

	//when the animation ends, if the next slide is a video, it starts playing by appending the fader class to it

	//the fader class has to be removed when the animation ends

	onMount(() => {
		animStore.update((store) => {
			store[index].ele = video;
			return store;
		});
	});
	
</script>

<div
	id="{id}"
	class="{classnames('slide-container absolute inset-0 c', {
		fader: should_animate && index === 0,
		'fader-image': slide_type === 'image' && index === 0,
		'z-20': index === 0,
		'z-10': index === 1
	})}"
	on:animationstart="{(e) => {
		if (slide_type === 'image' && index === 0 && $animStore[1].type === 'video') {
			$animStore[1].ele.play();
		}
	}}"
	on:animationend="{(e) => {
		should_animate = false;

		animStore.swap();
	}}"
>
	{#if slide_type === 'image'}
		<img
			class="slide lazy object-cover w-full h-full object-center"
			alt="'"
			src="{access_strapi_image(media)}"
		/>{:else}
		<video
			bind:this="{video}"
			class="slide object-cover w-full h-full object-center"
			alt="'"
			src="{access_strapi_image(media)}"
			muted
			on:ended="{() => {
				should_animate = true;
				if ($animStore[1].type === 'video') {
					$animStore[1].ele.play();
				}
			}}"
		>
		</video>
	{/if}
</div>

<style lang="scss">
	@keyframes fader {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
	.fader-image {
		animation-name: fader;
		animation-delay: 2s;
		animation-duration: 4s;
	}
	.fader {
		animation-name: fader;
		animation-delay: 0s;
		animation-duration: 3s;
	}
	.slide:nth-child(1) {
		z-index: 10;
	}
	.slide-container:nth-child(n + 3) {
		display: none;
	}
</style>
