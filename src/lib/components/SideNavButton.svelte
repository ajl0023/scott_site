<script>
	import { goto } from '$app/navigation';
	import _ from 'lodash-es';
	import { createEventDispatcher } from 'svelte';
	export let nav_item;
	export let expanded;
	export let handleExpand;
	export let index;

	let curr_expanded;
	$: {
		curr_expanded = expanded['is_expanded'] && expanded['index'] === index;
	}
	const dispatch = createEventDispatcher();

	const children = _.get(nav_item, 'attributes.children.data', []);
	const parent_data = _.get(nav_item, 'attributes', {});
</script>

<li class="cursor-pointer ">
	{#if parent_data['url']}
		<div>
			<p
				on:click="{() => {
					handleExpand(index);
					if (curr_expanded || children.length === 0) {
						goto(parent_data['url']);
						dispatch('close-nav');
					}
				}}"
				on:keydown="{() => {
					handleExpand(index);
					if (curr_expanded) {
						goto(parent_data['url']);
						dispatch('close-nav');
					}
				}}"
				class="py-2 px-3 text-center text-lg {curr_expanded
					? 'text-white'
					: 'text-[#002852]'}  hover:bg-[#002852] hover:text-white {curr_expanded
					? 'bg-[#002852] font-semibold'
					: ''}
	        bg-white uppercase"
				class:parent-menu-expanded="{curr_expanded}"
			>
				{parent_data['title']}
			</p>
			<div class="{curr_expanded ? 'block' : 'hidden'}">
				<ul>
					{#each children as { attributes: { title, url, target } }}
						<li>
							<a
								on:click="{() => {
									dispatch('close-nav');
								}}"
								target="{target === '_blank' ? target : ''}"
								rel="{target === '_blank' ? 'noreferrer' : ''}"
								href="{url}"
								><span
									class:text-white="{curr_expanded}"
									class="py-2 px-3 bg-[#3f88d5] text-center text-lg hover:bg-[#002852] hover:text-white not-last:border-b-2 not-last:border-white uppercase block"
								>
									{title}
								</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}
</li>
