<script>
	import { createEventDispatcher } from 'svelte';

	import { goto } from '$app/navigation';
	export let data;
	export let expanded;
	export let handleExpand;
	export let index;
	import { base } from '$app/paths';

	let curr_expanded;
	$: {
		curr_expanded = expanded['is_expanded'] && expanded['index'] === index;
	}
	const dispatch = createEventDispatcher();
</script>

<li class="cursor-pointer ">
	{#if data['link']}
		<div
			on:click="{() => {
				handleExpand(index);
				if (curr_expanded || data['nav_options'].length === 0) {
					goto('/' + data['link']);
					dispatch('close-nav');
				}
			}}"
			on:keydown="{() => {
				handleExpand(index);
				if (curr_expanded) {
					goto('/' + data['link']);
					dispatch('close-nav');
				}
			}}"
		>
			<p
				class="py-2 px-3 text-center text-lg {curr_expanded
					? 'text-white'
					: 'text-[#002852]'}  hover:bg-[#002852] hover:text-white {curr_expanded
					? 'bg-[#002852] font-semibold'
					: ''}
	        bg-white uppercase"
				class:parent-menu-expanded="{curr_expanded}"
			>
				{data.label}
			</p>
			<div class="{curr_expanded ? 'block' : 'hidden'}">
				{#each data['nav_options'] as { label, link, is_external_link }}
					<a
						on:click="{() => {
							dispatch('close-nav');
						}}"
						target="{is_external_link ? '_blank' : ''}"
						rel="{is_external_link ? 'noreferrer' : ''}"
						href="{is_external_link ? link : `/${link}`}"
						><p
							class:text-white="{curr_expanded}"
							class="py-2 px-3 bg-[#3f88d5] text-center text-lg hover:bg-[#002852] hover:text-white not-last:border-b-2 not-last:border-white uppercase"
						>
							{label}
						</p></a
					>
				{/each}
			</div>
		</div>
	{/if}
</li>
