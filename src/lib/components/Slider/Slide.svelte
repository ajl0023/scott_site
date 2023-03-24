<script>
	import classNames from 'classnames';
	import { getContext, onMount, tick } from 'svelte';
	import { fade } from 'svelte/transition';
	import { access_strapi_image } from '../../utils/utils';

	let video;
	export let shouldAnim;

	let current_time;
	export let slide_type;
	export let media;
	export let id;
	export let index;
	let animStore = getContext('animStore');
	// let shouldAnim = $animStore[index].shouldAnim;

	onMount(() => {
		animStore.setEle(video, index);

		//convert ms to seconds
	});
</script>

<div
	id="{id}"
	on:introstart="{() => {
		// animStore.easeNext();
	}}"
	on:outrostart="{async () => {
		setTimeout(() => {
			// animStore.swap();
		}, 1000);
	}}"
	class="{classNames('slide-container absolute inset-0 opacity-0 fade', {})}"
	on:animationstart="{(e) => {}}"
	on:animationend="{async (e) => {}}"
>
	{#if slide_type === 'image'}
		<img
			class="slide lazy object-cover w-full h-full object-center"
			alt="'"
			bind:this="{video}"
			src="{access_strapi_image(media)}"
		/>{:else}
		<video
			bind:this="{video}"
			class="slide object-cover w-full h-full object-center"
			alt="'"
			src="{access_strapi_image(media)}"
			muted
			bind:currentTime="{current_time}"
			bind:duration="{$animStore[index].duration}"
		>
		</video>
	{/if}
</div>

<style lang="scss">
	.fade{
		transition: opacity 1.5s;
	}
	// @keyframes fader {
	// 	from {
	// 		opacity: 1;
	// 	}
	// 	to {
	// 		opacity: 0;
	// 	}
	// }
	// .fader-image {
	// 	animation-name: fader;
	// 	animation-delay: 2s;
	// 	animation-duration: 4s;
	// }
	// .fader {
	// 	animation-name: fader;
	// 	animation-delay: 0s;
	// 	animation-duration: 3s;
	// }
	.fade-anim {
		
		opacity: 1;
	}
	// .slide:nth-child(1) {
	// 	z-index: 10;
	// }
	// .slide-container:nth-child(n + 3) {
	// 	// display: none;
	// }
</style>
