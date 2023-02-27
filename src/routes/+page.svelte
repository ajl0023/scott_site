<script>
	import { onMount } from 'svelte';
	import { get_current_component } from 'svelte/internal';
	import FeaturedListings from '../lib/components/FeaturedListings.svelte';
	import FutureProjects from '../lib/components/FutureProjects.svelte';
	import GlobalListings from '../lib/components/GlobalListings.svelte';
	import HomeFollowMe from '../lib/components/HomeFollowMe.svelte';
	import HomeScottInfo from '../lib/components/HomeScottInfo.svelte';
	import HomeServices from '../lib/components/HomeServices.svelte';
	import MediaRelationsHome from '../lib/components/MediaRelationsHome.svelte';
	import RealDealNews from '../lib/components/RealDealNews.svelte';

	import SalesStats from '../lib/components/SalesStats.svelte';
	import Slider from '../lib/components/Slider.svelte';
	import Testimonials from '../lib/components/Testimonials.svelte';
	export let data;
</script>

<div class="sv-container z-[1] relative  bg-[#eaeaea]">
	<div class="s-container">
		<Slider images="{data['page_data']['image_carousel']['data']}" />
		<div class="container"></div>
	</div>

	<FeaturedListings data="{data['page_data']['listings']}" />
	<HomeScottInfo data="{data['page_data']['home_agent']}" />
	<GlobalListings data="{data['page_data']['global_listings']}" />
	<HomeServices data="{data['page_data']['services']}" />
	<SalesStats data="{data['page_data']['sales_statistics']}" />
	<Testimonials data="{data['page_data']['testimonial']}" />
	<MediaRelationsHome data="{data['page_data']['media_relations']}" />

	<!-- these below should be all finished, simple html and responsive. 
		these probably dont need to be worked on.
	 -->
	<HomeFollowMe data="{data['page_data']['follow_me']}" />
	<RealDealNews data="{data['page_data']['real_deal_news']}" />

	<FutureProjects data="{data['page_data']['future_projects']}" />
</div>
