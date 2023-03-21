<script>
	import gsap from 'gsap';
	import _ from 'lodash-es';
	import { onMount } from 'svelte';
	export let nav_item;
	export let is_visible;

	let dropdown;
	let dropdown_parent;
	let is_hovered = false;

	const dropDownAnim = (isOver) => {
		gsap.to(dropdown, {
			height: isOver ? 'auto' : 0,
			duration: 0.2
		});
	};

	const children = _.get(nav_item, 'attributes.children.data', []);
	const parent_data = _.get(nav_item, 'attributes', {});
</script>

<div
	on:click="{() => {
		dropDownAnim(false);
		is_hovered = false;
		dropdown_parent.classList.add('pointer-events-none');
	}}"
	on:keydown="{() => {
		dropDownAnim(false);
		is_hovered = false;
	}}"
	on:mouseleave="{(e) => {
		dropDownAnim(false);
		is_hovered = false;
	}}"
	class="mr-4 menu-item-container"
>
	<li class="list-item text-white">
		{#if parent_data['url']}
			<a
				on:mouseenter="{() => {
					is_hovered = true;
					dropDownAnim(true);
				}}"
				class:main-nav="{!is_visible}"
				class="list-link {is_visible ? 'text-xs' : 'lg:text-md md:text-sm'}  group"
				href="{parent_data['url']}">{parent_data['title']}</a
			>
	
		
		{/if}
	</li>

	<div
		bind:this="{dropdown_parent}"
		class="padding-drop-container"
		class:hidden="{children.length <= 0}"
	>
		<div bind:this="{dropdown}" class="drop-down-container z-10 h-0">
			<ul class="list-drop-down-container ">
				{#each children as { attributes: { title, url, target } }}
					<li
						on:click="{() => {
							dropDownAnim(false);
							is_hovered = false;
							dropdown_parent.classList.add('pointer-events-none');
						}}"
						on:keydown="{() => {
							dropDownAnim(false);
							is_hovered = false;
						}}"
						class="list-item-sub cursor-pointer hover:bg-[#41a7c3] text-center font-semibold"
					>
						<a
							class="list-link-sub block whitespace-normal text-white select-none  py-2 px-2"
							target="{target === '_blank' ? target : ''}"
							rel="{target === '_blank' ? 'noreferrer' : ''}"
							href="{url}"
						>
							{title}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style lang="postcss">
	.padding-drop-container {
		pointer-events: none;
		padding-top: 10px;

		position: absolute;
		left: -200%;
		right: -200%;
		min-width: 205px;

		max-width: 100%;
		margin: 0 auto;
	}
	.drop-down-container {
		flex-direction: column;

		font-size: 14px;
		background-color: rgba(183, 222, 232, 0.8);

		overflow: hidden;
	}
	.menu-item-container {
		position: relative;

		&:first-child {
			margin-left: 0;
		}
		&:last-child {
			margin-right: 0;
		}

		&:hover .list-item::after {
			width: 100%;
		}
		&:hover .padding-drop-container {
			pointer-events: auto;
		}
	}
	@keyframes colorChange {
		from {
			color: white;
		}
		to {
			color: #41a7c3;
		}
	}

	.list-item {
		font-weight: 500;
		position: relative;

		&::after {
			position: absolute;
			content: '';
			background-color: #41a7c3;
			height: 1px;
			left: 0;
			right: 0;
			bottom: -5px;
			margin: auto;
			width: 0px;
			transition: width 0.3s ease-out;
			pointer-events: none;
		}

		.list-link {
			text-decoration: none;
			color: white;
			transition: color 0.3s ease-out;

			&:hover {
				color: #41a7c3;
			}
		}
	}
</style>
