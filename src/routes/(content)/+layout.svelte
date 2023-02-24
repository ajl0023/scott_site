<script>
	import MenuBar from './components/MenuBar.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import _ from 'lodash-es';
	export let data;

	$: mobile_bar_hidden = $page.url.pathname === '/neighborhood-guides';
</script>

<div class="wrapper">
	<div class="content-container flex lg:max-w-[1170px] w-full m-auto p-5">
		<div class="m-auto flex w-full lg:flex-row flex-col">
			<div class="page-container w-[100%] mb-10 lg:mb-0">
				<div class="header-container">
					<span> Home » Sellers » Decide to Sell </span>
					<h1
						class="text-[#41A7C3] text-[40px] md:text-[62px] font-barlow leading-tight mt-3 text-center lg:text-left"
					>
						Placeholder
						<!-- {page_name} -->
					</h1>
				</div>
				<div class="content-wrapper pr:0 lg:pr-5 mt-10 lg:mt-20">
					<slot />
				</div>
			</div>
			<div
				class:hidden="{mobile_bar_hidden}"
				class="menu-bar-wrapper inline-block text-center lg:text-left"
			>
				<MenuBar layout_data="{data}" />
			</div>
		</div>
	</div>
</div>

<style>
</style>
