<script>
	import FeaturedListings from '../lib/components/FeaturedListings.svelte';
	import FutureProjects from '../lib/components/FutureProjects.svelte';
	import GlobalListings from '../lib/components/GlobalListings.svelte';
	import HomeFollowMe from '../lib/components/HomeFollowMe.svelte';
	import HomeScottInfo from '../lib/components/HomeScottInfo.svelte';
	import HomeServices from '../lib/components/HomeServices.svelte';
	import MediaRelationsHome from '../lib/components/MediaRelationsHome.svelte';
	import RealDealNews from '../lib/components/RealDealNews.svelte';
	import _ from 'lodash-es';
	import SalesStats from '../lib/components/SalesStats.svelte';
	import Slider from '../lib/components/Slider/Slider.svelte';
	import Testimonials from '../lib/components/Testimonials.svelte';
	import { getContext, onDestroy, onMount } from 'svelte';
	import { url_new } from '../lib/dev';
	export let data;

	const audio_info_store = getContext('audio_info');
	const song_file = _.get(data, 'layout_data.song_file.data.attributes.url', '');

	onDestroy(() => {
		if ($audio_info_store.audio && !$audio_info_store.is_paused && $audio_info_store.play_prom) {
			$audio_info_store.play_prom.then(() => {
				$audio_info_store.audio.pause();
			});
		}
	});

	$: {
		if (
			$audio_info_store.loaded &&
			$audio_info_store.audio &&
			!$audio_info_store.user_paused &&
			$audio_info_store.is_paused
		) {
			$audio_info_store.play_prom = $audio_info_store.audio.play();
		}
	}
</script>

<div class="sv-container z-[1] relative  bg-[#eaeaea]">
	<div class="s-container relative">
		<Slider items="{data['page_data']['image_slider']}" />
		<div class="absolute text-white bottom-0 z-10 w-full text-center mb-20">
			<div
				class="w-full font-barlow uppercase md:text-5xl text-4xl 
				md:after:block
				md:before:block
				flex justify-center items-center	
			after:max-w-[20%]
			after:min-w-0
			after:w-full
			after:hidden
			after:bg-white
			after:h-1
			after:basis-1
			after:flex-grow
		
			before:hidden
			before:min-w-0
			before:max-w-[20%]
			before:w-auto
			before:basis-1
			before:flex-grow
			before:bg-white
			before:h-1"
			>
				<span class="mx-5"> search far and wide </span>
			</div>
			<div
				class="button-container font-sourceSans mt-6
			flex justify-center	items-center
	
	
			
			"
			>
				<a
					href="https://scottjames.elliman.com/sales/usa"
					target="_blank"
					rel="noreferrer"
					class="text-white bg-[#303030] px-8 py-4 transition-all hover:bg-[#41A7C3] uppercase  inline-block mx-3 max-w-md w-full"
					>dream home search</a
				>
			</div>
		</div>
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
