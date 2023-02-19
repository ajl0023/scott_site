<script>
	import sj_logo from '$lib/images/header-logo.png';
	import de_logo from '$lib/images/de-logo.png';
	export let nav_items;
	import gsap from 'gsap';
	import NavbarButton from './NavbarButton.svelte';
	import Phone from '../images/icons/phone.svelte';
	import Mail from '../images/icons/mail.svelte';
	import Hamburger from '../images/icons/hamburger.svelte';
	import SideNav from './SideNav.svelte';
	import { page } from '$app/stores';

	$: is_home = $page.route.id === '/';

	let eleRefs = [];
	$: {
		if (eleRefs.length > 0) {
			gsap.to(eleRefs);
		}
	}
</script>

<nav
	class="navbar whitespace-nowrap text-xs md:flex justify-center bg-black {is_home
		? 'absolute'
		: 'relative'}"
>
	<div class="mobile-top-bar flex bg-white items-center p-3 justify-between md:hidden">
		<SideNav menu_items="{nav_items}" />

		<div class="mobile-icon-container w-4 cursor-pointer">
			<Phone />
		</div>
		<div class="mobile-icon-container w-4 cursor-pointer">
			<Mail />
		</div>
	</div>

	<div
		class="md:justify-between navbar-container px-4 flex justify-center w-full lg:items-center lg:my-20 md:my-10 py-4 md:py-0"
	>
		<div class="nav-left-logo-container lg:max-w-[400px] max-w-[200px] w-full">
			<a href="/" class="block">
				<img class="nav-logo w-full object-contain" src="{sj_logo}" alt="" /></a
			>
		</div>
		<div class="nav-right-container text-right">
			<div class="nav-right-logo-container hidden md:inline-block md:w-[300px] lg:w-[auto]">
				<a target="_blank" rel="noreferrer" class="block" href="https://www.elliman.com/">
					<img class="nav-logo object-contain w-full" src="{de_logo}" alt="" />
				</a>
			</div>
			<div class="nav-menu-container md:mt-10 lg:mt-20">
				<ul class="nav-menu hidden md:flex">
					{#each nav_items as nav_item, i}
						<NavbarButton nav_item="{nav_item}" />
					{/each}
				</ul>
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
