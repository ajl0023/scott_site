<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import '../app.css';
	import '$lib/global.scss';
	import '$lib/styles.css';
	import '$lib/ckeditor.css';
	import '$lib/animations.scss';

	import '$lib/fonts/fonts.css';
	import '$lib/icons.scss';
	import { createLazyStore } from '$lib/stores/lazy';
	import Footer from '../lib/components/Footer/Footer.svelte';
	import Navbar from '../lib/components/Navbar.svelte';
	import Glide from '@glidejs/glide';
	export let data;

	import { onMount, tick } from 'svelte';

	onMount(() => {
		createLazyStore.init();
	});
	const handleLazy = async () => {

		if ($createLazyStore.lazy) {
			await tick();
			createLazyStore.update_lazy();
		}
	};
	$: {
		$page, handleLazy();
	}
</script>

<div class="wrapper">
	<Navbar nav_items="{data['layout_data']['navbar']}" />
	<div class="main-container">
		<slot />

		<Footer data="{data['layout_data']['footer']}" />
	</div>
</div>

<style lang="scss">
	.wrapper {
		width: 100%;

		.main-container {
			width: 100%;
		}
	}
</style>
