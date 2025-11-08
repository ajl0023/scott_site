<script>
	import FeaturedListings from '$lib/components/FeaturedListings.svelte';
	import FutureProjects from '$lib/components/FutureProjects.svelte';
	import GlobalListings from '$lib/components/GlobalListings.svelte';
	import HomeFollowMe from '$lib/components/HomeFollowMe.svelte';
	import HomeScottInfo from '$lib/components/HomeScottInfo.svelte';
	import HomeServices from '$lib/components/HomeServices.svelte';
	import MediaRelationsHome from '$lib/components/MediaRelationsHome.svelte';
	import RealDealNews from '$lib/components/RealDealNews.svelte';
	import _ from 'lodash-es';
	import SalesStats from '$lib/components/SalesStats.svelte';
	import Slider from '$lib/components/Slider/Slider.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
	import { getContext, onDestroy, onMount } from 'svelte';
	import { url_new } from '$lib/dev';
	import { page } from '$app/stores';
	import AltadenaRebuild from '../lib/components/AltadenaRebuild.svelte';
	export let data;

	const audio_info_store = getContext('audio_info');
	const song_file = _.get(data, 'layout_data.song_file.data.attributes.url', '');
	$: ({ audio, is_paused, user_paused } = $audio_info_store);
	let played = false;
	onDestroy(() => {
		if (audio) {
			audio.stop();
		}
	});
	//on first load, play the song
	//if the user pauses the song, don't play it again
	//if the user navigates away from the page, stop the song
	//if the user navigates back to the page, play the song only if it wasnt paused by the user

	// the issue is that i also have a button that pauses the song, so
	// weird race conditions are happening
	$: {
		if (!played && audio) {
			let is_playing = audio.playing();
			if (!is_playing && !user_paused) {
				audio.play();
				played = true;
			}
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
					href="https://www.elliman.com/sales/california"
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
	<AltadenaRebuild data="{data['page_data']['altadena_rebuild']}" />
	<GlobalListings data="{data['page_data']['global_listings']}" />
	<HomeServices data="{data['page_data']['services']}" />
	<SalesStats data="{data['page_data']['sales_statistics']}" />
	<Testimonials data="{data['page_data']['testimonial']}" />
	<MediaRelationsHome data="{data['page_data']['media_relations']}" />

	<HomeFollowMe data="{data['page_data']['follow_me']}" />
	<RealDealNews data="{data['page_data']['real_deal_news']}" />

	<FutureProjects data="{data['page_data']['future_projects']}" />
</div>
