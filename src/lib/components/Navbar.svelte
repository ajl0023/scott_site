<script>
	import { page } from '$app/stores';
	import de_logo from '$lib/images/de-logo.png';
	import sj_logo from '$lib/images/header-logo.png';
	import gsap from 'gsap';
	import _ from 'lodash-es';
	import IntersectionObserver from 'svelte-intersection-observer';
	import NavbarButton from './NavbarButton.svelte';

	export let nav_items;

	$: is_home = $page.route.id === '/';
	let main_navbar;
	let nav_dropdown;
	let eleRefs = [];
	$: {
		if (eleRefs.length > 0) {
			gsap.to(eleRefs);
		}
	}

	let main_navbar_visible;
	let is_mobile_view;

	let should_show_nav_dropdown;

	const handleObserve = async (e) => {
		main_navbar_visible = e.detail.isIntersecting;
		should_show_nav_dropdown = !main_navbar_visible;
	};

	const debouncedFn = _.debounce(() => {
		should_show_nav_dropdown = !main_navbar_visible;
	}, 500);
</script>

<!-- if navbar is out of view, this brings a small navbar from the into view, and vice versa -->

<svelte:window
	on:resize="{async () => {
		is_mobile_view = window.innerWidth < 1024;
		if (is_mobile_view) {
			should_show_nav_dropdown = false;
		} else {
			is_mobile_view = false;

			debouncedFn();
		}
	}}"
/>

<div
	bind:this="{nav_dropdown}"
	class="transition-all h-20 fixed top-0 left-0 right-0  bg-gray-400 z-20 lg:flex hidden items-center -translate-y-full {should_show_nav_dropdown
		? 'translate-y-0'
		: '-translate-y-full'}"
>
	<div class="nav-content w-full p-3 h-full flex items-center justify-between">
		<div class="logo-container w-auto h-full inline-block">
			<img height="127" width="329" class="max-h-full w-auto h-[inherit]" src="{sj_logo}" alt="" />
		</div>
		<div class="flex uppercase">
			{#each nav_items as nav_item, i}
				<NavbarButton is_visible="{true}" nav_item="{nav_item}" />
			{/each}
		</div>
	</div>
</div>

<nav
	class="navbar whitespace-nowrap text-xs lg:flex justify-center bg-black {is_home
		? 'absolute'
		: 'relative'}"
>
	<div
		class="lg:justify-between navbar-container px-4 flex justify-center w-full lg:items-center lg:my-20 py-4 lg:py-0"
	>
		<div class="nav-left-logo-container lg:max-w-[300px] max-w-[200px] w-full">
			<a href="/" class="block">
				<img class="nav-logo w-full object-contain" src="{sj_logo}" alt="" /></a
			>
		</div>
		<div class="nav-right-container text-right">
			<div class="nav-right-logo-container hidden lg:inline-block md:w-[300px] lg:w-[auto]">
				<a target="_blank" rel="noreferrer" class="block" href="https://www.elliman.com/">
					<img class="nav-logo object-contain w-full" src="{de_logo}" alt="" />
				</a>
			</div>
			<div class="nav-menu-container md:mt-10 lg:mt-20">
				<IntersectionObserver element="{main_navbar}" on:observe="{handleObserve}">
					<ul class="nav-menu hidden lg:flex" bind:this="{main_navbar}">
						{#each nav_items as nav_item, i}
							<NavbarButton is_visible="{false}" nav_item="{nav_item}" />
						{/each}
					</ul>
				</IntersectionObserver>
			</div>
		</div>
	</div>
</nav>

<style lang="postcss">
	.nav-menu-container {
		display: flex;
	}
	.nav-menu {
		color: white;

		text-transform: uppercase;
	}

	.navbar {
		width: 100%;

		top: 0;
		left: 0;
		right: 0;
		z-index: 2;
	}
</style>
