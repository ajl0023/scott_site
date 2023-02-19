<script>
	import '../app.css';

	import '$lib/styles.css';
	import '$lib/ckeditor.css';
	import '$lib/animations.scss';
	import Footer from '../lib/components/Footer/Footer.svelte';
	import Navbar from '../lib/components/Navbar.svelte';
	import '$lib/fonts/fonts.css';
	import '$lib/icons.scss';
	import { onMount } from 'svelte';
	export let data;
	onMount(() => {
		const ckImages = document.getElementsByClassName('ck-content');
	});
</script>

<div class="wrapper">
	<Navbar nav_items="{data['layout_data']['navbar']}" />
	<div class="main-container">
		<slot />

		<!-- <Footer data="{data['layout_data']['footer']}" /> -->
	</div>
</div>

<style lang="scss">
	.wrapper {
		width: 100%;

		position: relative;

		.main-container {
			width: 100%;
		}
	}
</style>
