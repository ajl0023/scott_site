<script>
	import MenuBar from './components/MenuBar.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import _ from 'lodash-es';
	export let data;

	let mobile_bar_hidden = $page.url.pathname === '/neighborhood-guides';
	let page_name;
	$: {
		let url = $page.url.pathname;
		let slug = url.split('/').filter(Boolean).pop();
		let page_title = slug.replace(/-/g, ' ');
		page_name = _.startCase(page_title);
	}
</script>

<div class="wrapper">
	<div class="content-container lg:max-w-[1300px] w-full m-auto p-5 ">
		<div class="m-auto flex w-full lg:flex-row flex-col lg:justify-between">
			<div
				class="page-container w-full {mobile_bar_hidden ? 'w-[100%]' : 'lg:w-[75%]'} mb-10 lg:mb-0"
			>
				<div class="header-container">
					<!-- <span> Home » Sellers » Decide to Sell </span> -->
					<h1
						class="text-[#41A7C3] text-[40px] md:text-[62px] font-barlow leading-tight mt-3 text-center lg:text-left"
					>
						{page_name}
						<!-- {page_name} -->
					</h1>
				</div>
				<div class="content-wrapper pr:0 lg:pr-5 mt-10 lg:mt-20">
					<slot />
				</div>
			</div>
			<div
				class:hidden="{mobile_bar_hidden}"
				class="menu-bar-wrapper lg:text-left max-w-xs w-full m-auto lg:m-0"
			>
				<MenuBar data="{data}" />
			</div>
		</div>
	</div>
</div>

<style>
</style>
