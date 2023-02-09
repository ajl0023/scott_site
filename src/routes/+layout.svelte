<script>
	import '../app.css';
	import Header from './Header.svelte';

	import '$lib/styles.css';

	import '$lib/animations.scss';
	import Footer from '../lib/components/Footer/Footer.svelte';
	import Navbar from '../lib/components/Navbar.svelte';
	export let data;
</script>

<div class="wrapper">
	<Navbar nav_items="{data['layout_data']['navbar']}" />
	<slot />

	<Footer data="{data['layout_data']['footer']}" />
</div>

<style lang="postcss">
	.wrapper {
		
	}
</style>
