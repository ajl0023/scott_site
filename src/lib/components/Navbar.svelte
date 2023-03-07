<script>
	import { page } from '$app/stores';

	import classNames from 'classnames';
	import gsap from 'gsap';
	import _ from 'lodash-es';
	import IntersectionObserver from 'svelte-intersection-observer';
	import { access_strapi_image } from '../utils/utils';
	import NavbarButton from './NavbarButton.svelte';

	export let data;

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

	const { nav_items, bg_image, nav_sj_logo, nav_de_logo } = data;
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
	class="transition-all h-30 fixed top-0 left-0 right-0  bg-gray-400 z-20 hidden lg:block items-center -translate-y-full {should_show_nav_dropdown
		? 'translate-y-0'
		: '-translate-y-full'}  px-5 pt-5 pb-3"
>
	<div class="nav-content w-full flex items-center justify-between">
		<a href="/" class="logo-container h-auto inline-block max-w-[200px] w-full flex-1">
			<img
				height="127"
				width="329"
				class="max-h-full w-full h-[inherit]"
				src="{access_strapi_image(nav_sj_logo.white)}"
				alt=""
			/>
		</a>
		<a href="/" class="logo-container max-w-[220px] w-full inline-block h-auto">
			<img
				height="56"
				width="400"
				class="max-h-full w-auto h-[inherit]"
				src="{access_strapi_image(nav_de_logo.white)}"
				alt=""
			/>
		</a>
	</div>
	<div class="">
		<div class="flex uppercase justify-end">
			{#each nav_items as nav_item, i}
				<NavbarButton is_visible="{true}" nav_item="{nav_item}" />
			{/each}
		</div>
	</div>
</div>

<nav
	style="{is_home ? `` : `background-image: url(${access_strapi_image(bg_image)});`}"
	class="{classNames(
		'top-0 left-0 right-0 w-full z-[2] whitespace-nowrap text-xs justify-center lg:py-8 lg:px-4',
		{
			absolute: is_home,
			['relative dark-overlay bg-cover bg-center bg-no-repeat before:z-[-1]']: !is_home
		}
	)}"
>
	<div
		class="lg:justify-between navbar-container flex justify-center w-full lg:items-center py-4 lg:py-0 z-10 relative"
	>
		<div class="nav-left-logo-container lg:max-w-[300px] max-w-[200px] w-full">
			<a href="/" class="block">
				<img
					class="nav-logo w-full object-contain"
					src="{access_strapi_image(nav_sj_logo.white)}"
					alt=""
				/></a
			>
		</div>
		<div class="nav-right-container text-right">
			<div class="nav-right-logo-container hidden lg:inline-block max-w-[300px] lg:w-[auto]">
				<a target="_blank" rel="noreferrer" class="block" href="https://www.elliman.com/">
					<img
						class="nav-logo object-contain w-full"
						src="{access_strapi_image(nav_de_logo.white)}"
						alt=""
					/>
				</a>
			</div>
		</div>
	</div>
	<div class="nav-menu-container text-right flex justify-end lg:mt-5">
		<IntersectionObserver element="{main_navbar}" on:observe="{handleObserve}">
			<ul class="nav-menu hidden lg:flex text-white uppercase" bind:this="{main_navbar}">
				{#each nav_items as nav_item, i}
					<!-- might have to include language later -->
					{#if nav_item.label !== 'language'}
						<NavbarButton is_visible="{false}" nav_item="{nav_item}" />
					{/if}
				{/each}
			</ul>
		</IntersectionObserver>
	</div>
</nav>

<style lang="postcss">
</style>
