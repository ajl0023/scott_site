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

	let eleRefs = [];
	$: {
		if (eleRefs.length > 0) {
			gsap.to(eleRefs);
		}
	}
</script>

<nav
	class="navbar bg-black whitespace-nowrap text-xs flex justify-center lg:h-[400px] "
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

	<div class="md:justify-between navbar-container p-4 flex justify-center w-full lg:mt-8">
		<div class="nav-left-logo-container w-60 lg:w-[700px] mr-2">
			<img class="nav-logo object-contain" src="{sj_logo}" alt="" />
		</div>
		<div class="nav-right-container">
			<div class="nav-right-logo-container hidden md:block">
				<img class="nav-logo" src="{de_logo}" alt="" />
			</div>
			<div class="nav-menu-container">
				<ul class="nav-menu hidden md:flex md:mt-5 lg:mt-10">
					{#each nav_items as nav_item, i}
						<NavbarButton nav_item="{nav_item}" />
					{/each}
				</ul>
			</div>
		</div>
	</div>
</nav>

<style lang="scss">
	.drop-down-container {
		display: flex;
		flex-direction: column;
		position: absolute;
		min-width: 205px;
		font-size: 14px;
		background-color: rgba(183, 222, 232, 0.8);
		left: -200%;
		right: -200%;
		margin: 0 auto;
		max-width: 100%;
		top: 150%;
		max-height: 0;
		overflow: hidden;
		transition: max-height 0.3s ease-out;
		.list-item-sub {
			text-align: center;
			padding: 5px;
			font-weight: 500;
			&:hover {
				background-color: #41a7c3;
			}
		}
		.list-link-sub {
			color: white;
			text-align: center;
			text-decoration: none;
		}
	}
	.menu-item-container {
		position: relative;
		margin: 0 30px;
		&:first-child {
			margin-left: 0;
		}
		&:last-child {
			margin-right: 0;
		}
	}
	@keyframes colorChange {
		from {
			color: white;
		}
		to {
			color: #41a7c3;
		}
	}

	.nav-right-container {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	.nav-menu-container {
		display: flex;
	}
	.nav-menu {
		color: white;

		text-transform: uppercase;

		.list-item {
			font-weight: 500;
			position: relative;

			&:hover::after {
				width: 100%;
			}
			&::after {
				position: absolute;
				content: '';
				background-color: #41a7c3;
				height: 1px;
				left: 0;
				right: 0;
				bottom: -5px;
				margin: auto;
				width: 0px;
				transition: width 0.3s ease-out;
			}

			.list-link {
				text-decoration: none;
				color: white;
				transition: color 0.3s ease-out;

				&:hover {
					color: #41a7c3;
				}
			}
		}
	}

	.navbar {
		width: 100%;
		position: absolute;
		top: 0;
		z-index: 2;
	}
</style>
