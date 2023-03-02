<script>
	import { onMount } from 'svelte';
	import Slide from './Slide.svelte';
	import { animStore } from './store';

	export let items = [];

	let formatted = [...items].map((item, i) => {
		return {
			...item,
			index: i
		};
	});
	animStore.init(formatted);

	onMount(async () => {
		animStore.start();
	});
</script>

<div class="wrapper h-[100vh] bg-black">
	<!-- <button
		class="z-30 cursor-pointer relative translate-y-[50vh] text-white"
		on:click="{() => {
			$animStore[0].ele.currentTime = 10000;
		}}">123123123</button
	> -->

	<div id="stage" class="hero slider-container h-full">
		{#each $animStore as { image, id, type, video_url, should_play, index }, i (index)}
			<Slide
				id="{id}"
				index="{i}"
				shouldPlay="{should_play}"
				video_url="{video_url}"
				slide_type="{type}"
				image="{image}"
			/>
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
			background-color: rgba(13, 13, 13, 0.4);
			pointer-events: none;
		}
	}
</style>
