<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import '../app.css';
	import '$lib/global.scss';
	import '$lib/styles.css';

	import '$lib/animations.scss';

	import '$lib/fonts/fonts.css';
	import '$lib/icons.scss';
	import { createLazyStore } from '$lib/stores/lazy';
	import Footer from '../lib/components/Footer/Footer.svelte';
	import Navbar from '../lib/components/Navbar.svelte';

	import { onMount, setContext, tick } from 'svelte';
	import SideNav from '../lib/components/SideNav.svelte';
	import Mail from '../lib/images/icons/mail.svelte';
	import Phone from '../lib/images/icons/phone.svelte';
	import _ from 'lodash-es';
	import { url_new } from '../lib/dev';
	import ContactBar from '../lib/components/ContactBar.svelte';
	import { writable } from 'svelte/store';
	import '$lib/utils/yup_methods.js';

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
	// Code does following (English)
	function add(a, b) {
		return a + b;
	}
	setContext('audio_info', audio_info_store);
	const song_file = _.get(data, 'layout_data.song_file.data.attributes.url', '');

	onMount(() => {
		$audio_info_store.audio.currentTime = 2;
		$audio_info_store.audio.volume = 0.018;
		$audio_info_store.audio.loop = true;
		const ele = $audio_info_store.audio;

		if (!$audio_info_store.user_paused) {
			fetch(url_new + song_file)
				.then((response) => response.blob())
				.then((blob) => {
					const url = URL.createObjectURL(blob);
					ele.src = url;

					$audio_info_store.loaded = true;
				});
		}
		// if the user is on the home page, play the audio
		// if the user is not on the home page, pause the audio
	});
</script>

<!-- <svelte:head>
	<script
		type="text/javascript"
		src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
	>
	</script>

	<script>
		function googleTranslateElementInit() {
			new google.translate.TranslateElement(
				{ pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL },
				'google_translate_element'
			);
		}

	</script>
</svelte:head> -->
<audio bind:this="{$audio_info_store.audio}" bind:paused="{$audio_info_store.is_paused}"> </audio>

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
				bg_image: data['layout_data']['navbar']['bg_image'],
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
		<div class="main-container  overflow-hidden">
			<slot />

			<Footer
				de_logo="{data['layout_data']['de_logo_black']}"
				data="{data['layout_data']['footer']}"
			/>
		</div>
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
