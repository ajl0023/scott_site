<script>
	import MenuBar from './components/MenuBar.svelte';
	import { page } from '$app/stores';
	import { onMount, setContext } from 'svelte';
	import _ from 'lodash-es';
	import { writable } from 'svelte/store';
	import classNames from 'classnames';
	import { access_strapi_image } from '../../lib/utils/utils';
	export let data;

	$: mobile_bar_hidden = $page.route.id === '/(content)/neighborhood-guides';
	let page_name;
	const titleStore = writable('');
	setContext('title', titleStore);

	const hide_routes = [
		'/(content)/neighborhood-guides',
		'/(content)/homes-for-sale-details/[address]/[id]',
		'/(content)/douglas-elliman'
	];

	$: {
		if (!hide_routes.includes($page.route.id)) {
			// Get the page URL and split it into an array
			let url = $page.url.pathname;
			let urlParts = url.split('/');

			// Get the last item in the array, which is the page slug
			let slug = urlParts[urlParts.length - 1];

			// Replace hyphens with spaces and title-case the string
			let page_title = slug.replace(/-/g, ' ');
			$titleStore = _.startCase(page_title);
		}
	}
	$: hide_title = hide_routes.includes($page.route.id);
</script>

<div class="wrapper">
	<div class="content-container lg:max-w-[1300px] w-full m-auto p-5 ">
		<div class="m-auto flex w-full lg:flex-row flex-col lg:justify-between">
			<div
				class="page-container w-full {mobile_bar_hidden ? 'w-[100%]' : 'lg:w-[75%]'} mb-10 lg:mb-0"
			>
				<div class="header-container">
					<!-- <span> Home » Sellers » Decide to Sell </span> -->
					{#if $page.route.id === '/(content)/douglas-elliman'}
						<div class="logo-container max-w-lg">
							<img class="w-full" src="{access_strapi_image(data.layout_data.de_logo)}" alt="" />
						</div>
					{/if}
					<h1
						class="{classNames(
							'text-[#41A7C3] text-[40px] md:text-[62px] font-barlow leading-tight mt-3 text-center lg:text-left ',
							{
								hidden: hide_title
							}
						)}"
					>
						{$titleStore}
						<!-- {page_name} -->
					</h1>
				</div>
				<div class="content-wrapper pr:0 lg:pr-5 mt-10 lg:mt-20">
					<slot />
				</div>
			</div>
			<div
				class:hidden="{mobile_bar_hidden}"
				class="menu-bar-wrapper lg:text-left max-w-[15em] w-full m-auto lg:m-0"
			>
				<MenuBar data="{data}" />
			</div>
		</div>
	</div>
</div>

<style>
</style>
