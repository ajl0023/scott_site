<script>
	import { access_strapi_image, getJson } from '../../../../lib/utils/utils';
	import IntersectionObserver from 'svelte-intersection-observer';
	import Paginator from '../../components/Paginator.svelte';
	import PaginationBar from '../../components/PaginationBar.svelte';

	export let data;
	let pagination = {
		page: null,
		pageCount: null
	};
	let scrollFetchEle;
	let articles = data['page_data']['data'];

	const page_meta = data['page_data']['meta']['pagination'];
	let pages = Array(page_meta.pageCount);
	pagination = page_meta;

	let is_loading = false;
	let element;

	const fetchData = async (page) => {
		// is_loading = true;
		const res_data = await getJson(fetch(`/api/media-posts?page=${page}`));
		// is_loading = false;
		articles = res_data['data']['data'];
		pagination = res_data['data']['meta']['pagination'];
		// has_more = pagination.page < pagination.pageCount;
	};
</script>

<div class="wrapper w-full">
	<div class="article-wrapper divide-y-2 w-full " elementScroll="{scrollFetchEle}">
		{#each articles as { attributes: { name, link, content, title, is_external_link, created_on, image }, id }}
			<div
				class="card-component flex py-5 md:flex-row flex-col md:space-x-4 items-center md:items-start"
			>
				<a
					href="{is_external_link ? link : '/' + link}"
					target="{is_external_link ? '_blank' : ''}"
					rel="{is_external_link ? 'noreferrer' : ''}"
					class="flex-shrink-0 image-container w-[180px] h-[180px] flex md:items-center border-[rgb(183,222,232)]/65 border-[1px] p-2 justify-center"
				>
					<img class="w-full object-contain h-full" src="{access_strapi_image(image)}" alt="" />
				</a>
				<div class="text-container py-6 w-full">
					<a
						href="{is_external_link ? link : '/' + link}"
						target="{is_external_link ? '_blank' : ''}"
						rel="{is_external_link ? 'noreferrer' : ''}"
						class="hover:text-[#41A7C3] text-container font-barlow text-2xl font-medium block">{title}</a
					>
					<span class="block hover:text-[#41A7C3] mt-5">
						<a
							class="underline italic"
							href="{is_external_link ? link : '/' + link}"
							target="{is_external_link ? '_blank' : ''}"
							rel="{is_external_link ? 'noreferrer' : ''}">Read More</a
						>
					</span>
				</div>
			</div>
		{/each}
	</div>
	<div class="pagin-wrapper flex space-x-1 mt-4">
		<PaginationBar
			pageCount="{pagination.pageCount}"
			curr_page="{pagination.page}"
			handleFetch="{fetchData}"
		/>
	</div>
</div>
