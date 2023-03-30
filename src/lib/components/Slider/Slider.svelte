<script>
	import { onMount, setContext, tick } from 'svelte';
	import Slide from './Slide.svelte';
	import { getAnimStore } from './store';

	export let items = [];

	let formatted = [...items].map((item, i) => {
		return {
			...item,
			loaded: item['type'] === 'image' ? true : false,
			index: i
		};
	});

	// formatted = formatted.filter((item) => item.type === 'video');

	const animStore = getAnimStore();
	setContext('animStore', animStore);

	animStore.init(formatted);

	const startSlide = () => {
		let currIndex = 0;
		let slides = $animStore;
		let last = slides.pop();
		slides.unshift(last);
		function slideShow() {
			function fadeIn(e) {
				e.parentElement.classList.add('fade-anim');

				if (slides[currIndex].type === 'video') {
					slides[currIndex].ele.play();
				}
			}

			function fadeOut(e) {
				e.parentElement.classList.remove('fade-anim');
			}

			fadeOut(slides[currIndex].ele);
			currIndex++;
			if (currIndex === slides.length) {
				currIndex = 0;
			}

			fadeIn(slides[currIndex].ele);
			slides[currIndex].ended().then(() => {
				slideShow();
			});
		}
		slideShow();
	};
	onMount(async () => {
		await tick();
		startSlide();
	});
</script>

<div class="wrapper h-[100vh] bg-black">
	<div id="stage" class="hero slider-container h-full">
		{#each $animStore as { id, type, should_play, media }, i (id)}
			<Slide id="{id}" index="{i}" shouldPlay="{should_play}" media="{media}" slide_type="{type}" />
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
