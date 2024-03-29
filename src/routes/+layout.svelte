<script>
	import { page } from '$app/stores';
	import '$lib/global.scss';
	import '$lib/styles.css';
	import '../app.css';

	import '$lib/animations.scss';

	import ContactBar from '$lib/components/ContactBar.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import SideNav from '$lib/components/SideNav.svelte';
	import { url_new } from '$lib/dev';
	import '$lib/fonts/fonts.css';
	import '$lib/icons.scss';
	import Mail from '$lib/images/icons/mail.svelte';
	import Phone from '$lib/images/icons/phone.svelte';
	import { createLazyStore } from '$lib/stores/lazy';

	import { Howl } from 'howler';
	import _ from 'lodash-es';
	import { onMount, setContext, tick } from 'svelte';
	import { writable } from 'svelte/store';

	export let data;

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

	const mobile_nav_info = data['layout_data']['mobile_top_bar'].data;
	const icon_map = {
		phone: Phone,
		email: Mail
	};

	setContext('sj_logos', {
		black: data['layout_data']['sj_black'],
		white: data['layout_data']['sj_white']
	});
	//navbar data is both in the layout data and the navbar data

	const audio_info_store = writable({
		is_paused: true,
		user_paused: false,
		audio: null,
		loaded: false,
		play_prom: null
	});

	setContext('audio_info', audio_info_store);
	const song_file = _.get(data, 'layout_data.song_file.data.attributes.url', '');

	onMount(() => {
		const audio = new Howl({
			src: [url_new + song_file],
			onplay: () => {
				$audio_info_store.is_paused = false;
			},
			onpause: () => {
				$audio_info_store.is_paused = true;
			},
			onend: () => {
				$audio_info_store.is_paused = true;
			},
			onstop: () => {
				$audio_info_store.is_paused = true;
			},

			autoplay: false,
			preload: true,
			volume: 0.018,
			//seek

			loop: true
		});

		$audio_info_store.audio = audio;

		// if the user is on the home page, play the audio
		// if the user is not on the home page, pause the audio
	});
</script>

<svelte:head>
	<script async src="https://translate.google.com/translate_a/element.js"></script>
</svelte:head>
<ContactBar items="{data['layout_data']['contact_bar_items']}" />
<div class="wrapper">
	<div
		class="z-20 mobile-top-bar flex bg-white items-center p-3 justify-between lg:hidden fixed left-0 right-0 top-0"
	>
		<SideNav menu_items="{data['navbar_data']}" />
		{#each mobile_nav_info as item}
			{@const is_phone = item['attributes']['contact_info_type'] === 'phone'}
			<a
				class="mobile-icon-container w-4 cursor-pointer block"
				rel="external"
				href="
				{is_phone
					? `tel:${item['attributes']['contact_info']}`
					: `mailto:${item['attributes']['contact_info']}`}
			"
			>
				<svelte:component this="{icon_map[item['attributes']['contact_info_type']]}" />
			</a>
		{/each}
	</div>

	<div class="content-wrapper lg:mt-[0px] mt-[40px] relative">
		<Navbar
			data="{{
				nav_items: data['navbar_data'],
				bg_image:
					$page.route.id === '/(content)/concierge'
						? data['layout_data']['navbar']['bg_concierge_image']
						: data['layout_data']['navbar']['bg_image'],
				nav_sj_logo: {
					black: data['layout_data']['sj_black'],
					white: data['layout_data']['sj_white']
				},
				nav_de_logo: {
					black: data['layout_data']['de_logo_black'],
					white: data['layout_data']['de_logo_white']
				}
			}}"
		/>
	</div>
	<div class="main-container  overflow-hidden">
		<slot />

		<Footer
			de_logo="{data['layout_data']['de_logo_black']}"
			data="{data['layout_data']['footer']}"
		/>
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
