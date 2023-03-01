<script>
	import _ from 'lodash-es';
	import moment from 'moment';
	import { getJson } from '../../../lib/utils/utils';
	import PaginationBar from '../components/PaginationBar.svelte';
	import Paginator from '../components/Paginator.svelte';
	import Form from './components/ReviewForm.svelte';
	import Stars from './components/Stars.svelte';

	export let data;
	let pagination = {
		page: null,
		pageCount: null
	};

	let reviews = data['page_data']['data'];

	const page_meta = data['page_data']['meta']['pagination'];
	let pages = Array(page_meta.pageCount);
	pagination = page_meta;

	const fetchData = async (page) => {
		// is_loading = true;
		const res_data = await getJson(fetch(`/api/reviews?page=${page}`));
		// is_loading = false;
		reviews = res_data['data']['data'];
		pagination = res_data['data']['meta']['pagination'];
		// has_more = pagination.page < pagination.pageCount;
	};
	const handleSubmit = () => {};
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
				<div class="text-content prose md:prose-xl">
					<blockquote class="review-text-container border-l-2 border-l-[#e5e7eb] ml-5">
						<p class="text-[14px] font-light p-5">{content}</p>
					</blockquote>
				</div>
			</div>
		{/each}
	</div>
	<div class="pagin-wrapper">
		<PaginationBar
			pageCount="{pagination.pageCount}"
			curr_page="{pagination.page}"
			handleFetch="{fetchData}"
		/>
	</div>
</div>
