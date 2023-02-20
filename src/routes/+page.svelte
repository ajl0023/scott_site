<script>
	import FeaturedListings from '../lib/components/FeaturedListings.svelte';
	import GlobalListings from '../lib/components/GlobalListings.svelte';
	import HomeScottInfo from '../lib/components/HomeScottInfo.svelte';
	import HomeServices from '../lib/components/HomeServices.svelte';
	import MediaRelationsHome from '../lib/components/MediaRelationsHome.svelte';

	import SalesStats from '../lib/components/SalesStats.svelte';
	import Slider from '../lib/components/Slider.svelte';
	import Testimonials from '../lib/components/Testimonials.svelte';
	export let data;

</script>

<div class="sv-container z-[1] relative">
	<div class="dummy mt-[300px]"></div>
	<div class="s-container">
		<Slider images="{data['page_data']['image_carousel']['data']}" />
		<div class="container"></div>
	</div>

	<FeaturedListings />
	<HomeScottInfo data="{data['page_data']['home_agent']}" />
	<GlobalListings data="{data['page_data']['global_listings']}" />
	<HomeServices data="{data['services']}" />
	<SalesStats data="{data['page_data']['sales_statistics']}" />
	<Testimonials data="{data['page_data']['testimonial']}" />
	<MediaRelationsHome data="{data['page_data']['media_relations']}" />
</div>
