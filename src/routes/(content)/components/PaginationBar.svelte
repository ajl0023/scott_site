<script>
	import Paginator from './Paginator.svelte';

	export let pageCount;
	export let curr_page;
	export let handleFetch;

	function getPaginationRange(curr_page, pageCount) {
		//how do i use one number to represent like 7 and know that the range should be in the 6-10 range?
		let starting_page;
		let ending_range;
		let pages = [];

		if (pageCount <= 5) {
			starting_page = 1;
			ending_range = pageCount;
		} else {
			starting_page = Math.floor((curr_page - 1) / 5) * 5 + 1;
			ending_range = starting_page + 4;
			if (ending_range > pageCount) {
				ending_range = pageCount;
			}
		}
		for (let i = starting_page; i <= ending_range; i++) {
			pages.push(i);
		}
		return pages;
	}

	const gen_pages = getPaginationRange(curr_page, pageCount);
</script>

<div class="wrapper pagin-wrapper flex space-x-1 mt-4">
	<Paginator
		label="‹"
		inactive="{curr_page === 1}"
		fetchData="{() => {
			if (curr_page > 1) {
				handleFetch(curr_page - 1);
			}
		}}"
	/>
	{#each gen_pages as page_num}
		<Paginator
			label="{page_num}"
			active="{curr_page === page_num}"
			fetchData="{() => {
				handleFetch(page_num);
			}}"
		/>
	{/each}
	<Paginator
		label="›"
		inactive="{curr_page === pageCount}"
		fetchData="{() => {
			if (curr_page < pageCount) {
				handleFetch(curr_page + 1);
			}
		}}"
	/>
</div>
