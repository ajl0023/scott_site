<script>
	import { access_strapi_image, getJson } from '../../../lib/utils/utils';
	import Stars from './components/Stars.svelte';
	import moment from 'moment';
	import _ from 'lodash-es';
	import InfiniteScroll from 'svelte-infinite-scroll';
	import Form from './components/Form.svelte';

	export let data;
	let pagination = {
		page: null,
		pageCount: null
	};
	export const prerender = true;

	let reviews = data['page_data']['data'];
	let form;
	const page_meta = data['page_data']['meta']['pagination'];

	pagination = page_meta;
	let has_more = pagination.page < pagination.pageCount;
	let is_loading = false;
	const fetchData = async () => {
		is_loading = true;
		const res_data = await getJson(fetch(`/api/reviews?page=${pagination.page + 1}`));
		is_loading = false;
		reviews = [...reviews, ...res_data['data']['data']];
		pagination = res_data['data']['meta']['pagination'];
		has_more = pagination.page < pagination.pageCount;
	};
	const handleForm = async () => {};
</script>

<div class="wrapper w-full font-roboto">
	<Form />
	<div class="review-wrapper divide-y space-y-6">
		{#each reviews as { attributes: { name, content, title, review, created_on }, id }}
			<div class="review-container">
				<div class="header-container flex md:items-center flex-col md:flex-row">
					<Stars rating="{review}" id="{id}" active="{false}" />
					<span class="date text-[12px] italic text-[#666666]"
						>{moment(created_on).format('MMM D, YYYY')} by {_.startCase(name)} on Scott James Luxury
						Estates</span
					>
				</div>
				<div class="text-content prose lg:prose-lg">
					<blockquote class="review-text-container border-l-2 border-l-[#e5e7eb] ml-5">
						<p class="text-[14px] font-light p-5">{content}</p>
					</blockquote>
				</div>
			</div>
		{/each}
		<InfiniteScroll
			hasMore="{has_more}"
			window="{true}"
			threshold="{200}"
			on:loadMore="{() => {
				fetchData();
			}}"
		/>
	</div>
</div>
