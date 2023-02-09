<script>
	import FeaturedListings from '../lib/components/FeaturedListings.svelte';
	import GlobalListings from '../lib/components/GlobalListings.svelte';
	import HomeScottInfo from '../lib/components/HomeScottInfo.svelte';
	import HomeServices from '../lib/components/HomeServices.svelte';
	import Navbar from '../lib/components/Navbar.svelte';
	import SalesStats from '../lib/components/SalesStats.svelte';
	import Slider from '../lib/components/Slider.svelte';
	export let data;
</script>

<div class="sv-container">
	<!-- <div class="s-container">
		<Slider images="{data['page_data']['image_carousel']['data']}" />
		<div class="container"></div>
	</div> -->

	<!-- <FeaturedListings /> -->
	<!-- <HomeScottInfo data="{data['page_data']['home_agent']}" />
	<GlobalListings data="{data['page_data']['global_listings']}" />
	<HomeServices data="{data['page_data']['services']}" /> -->
	<SalesStats data="{data['page_data']['sales_statistics']}" />
</div>
