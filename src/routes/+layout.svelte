<script>
	import { browser } from '$app/environment';
	import '../app.css';

	import '$lib/styles.css';
	import '$lib/ckeditor.css';
	import '$lib/animations.scss';

	import '$lib/fonts/fonts.css';
	import '$lib/icons.scss';

	import Footer from '../lib/components/Footer/Footer.svelte';
	import Navbar from '../lib/components/Navbar.svelte';

	export let data;
	import LazyLoad from 'vanilla-lazyload';

	import { onMount } from 'svelte';


	onMount(() => {
		var lazyLoadInstance = new LazyLoad({
			// Your custom settings go here
		
		});
	
	});
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
