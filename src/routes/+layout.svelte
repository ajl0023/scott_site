<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import '../app.css';
	import '$lib/global.scss';
	import '$lib/styles.css';
	import '$lib/ckeditor.css';
	import '$lib/animations.scss';

	import '$lib/fonts/fonts.css';
	import '$lib/icons.scss';
	import { createLazyStore } from '$lib/stores/lazy';
	import Footer from '../lib/components/Footer/Footer.svelte';
	import Navbar from '../lib/components/Navbar.svelte';

	export let data;

	import { onMount, tick } from 'svelte';
	import SideNav from '../lib/components/SideNav.svelte';
	import Mail from '../lib/images/icons/mail.svelte';
	import Phone from '../lib/images/icons/phone.svelte';
	import _ from 'lodash-es';
	import { url_new } from '../lib/dev';
	import ContactBar from '../lib/components/ContactBar.svelte';
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
	const song_file = _.get(data, 'layout_data.song_file.data.attributes.url', '');
	let audio;
	let is_paused;
	let played;
	onMount(() => {
		audio.volume = 0.018;
		audio.autoplay = true;
	});
</script>

<audio
	bind:this="{audio}"
	bind:paused="{is_paused}"
	bind:played="{played}"
	autoplay
	src="{url_new + song_file}"></audio>

<ContactBar
	on:audio_toggle="{() => {
		if (is_paused || played.length === 0) {
			audio.play();
		} else {
			audio.pause();
		}
	}}"
	is_paused="{is_paused || (played && played.length === 0)}"
	items="{data['layout_data']['contact_bar_items']}"
/>
<div class="wrapper">
	<div
		class="z-20 mobile-top-bar flex bg-white items-center p-3 justify-between lg:hidden fixed left-0 right-0 top-0"
	>
		<SideNav menu_items="{data['layout_data']['navbar']}" />

		<div class="mobile-icon-container w-4 cursor-pointer">
			<Phone />
		</div>
		<div class="mobile-icon-container w-4 cursor-pointer">
			<Mail />
		</div>
	</div>

	<div class="content-wrapper lg:mt-[0px] mt-[40px] relative">
		<Navbar nav_items="{data['layout_data']['navbar']}" />
		<div class="main-container  overflow-hidden">
			<slot />

			<Footer data="{data['layout_data']['footer']}" />
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
