<script>
	export let data;
	export let expanded;
	export let handleExpand;
	export let index;
	let curr_expanded;
	$: {
		curr_expanded = expanded['is_expanded'] && expanded['index'] === index;
	}
</script>

<li class="cursor-pointer ">
	<p
		on:click="{() => {
			handleExpand(index);
		}}"
		on:keydown
		class="py-2 px-3 text-center text-lg text-[#002852]  hover:bg-[#002852] hover:text-white  
        bg-white"
		class:parent-menu-expanded="{curr_expanded}"
	>
		{data.label}
	</p>
	<div class="{curr_expanded ? 'block' : 'hidden'}">
		{#each data['nav_options'] as item}
			<p
				class="py-2 px-3 bg-[#3f88d5] text-center text-lg text-[#002852] hover:bg-[#002852] hover:text-white not-last:border-b-2 not-last:border-white"
			>
				{item.label}
			</p>
		{/each}
	</div>
</li>

<style lang="scss">
	.parent-menu-expanded {
		@apply bg-[#002852];
		@apply text-white;
		@apply border-blue-600;
	}
</style>
