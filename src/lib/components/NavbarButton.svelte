<script>
	import gsap from 'gsap';
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
</script>

<div
	on:mouseleave="{(e) => {
		dropDownAnim(false);
		is_hovered = false;
	}}"
	class="mr-4 menu-item-container"
>
	<li class="list-item">
		<a
			on:mouseenter="{() => {
				is_hovered = true;
				dropDownAnim(true);
			}}"
			class:main-nav="{!is_visible}"
			class="list-link {is_visible ? 'text-xs' : 'lg:text-lg md:text-sm'}  group"
			href="/{nav_item['link']}">{nav_item['label']}</a
		>
	</li>

	<div
		bind:this="{dropdown_parent}"
		class="padding-drop-container"
		class:hidden="{nav_item['nav_options'].length <= 0}"
	>
		<div bind:this="{dropdown}" class="drop-down-container z-10 h-0">
			<ul class="list-drop-down-container ">
				{#each nav_item['nav_options'] as sub_nav}
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
							target="{sub_nav['is_external_link'] ? '_blank' : ''}"
							rel="{sub_nav['is_external_link'] ? 'noreferrer' : ''}"
							href="{sub_nav['is_external_link'] ? sub_nav.link : `/${sub_nav.link}`}"
						>
							{sub_nav['label']}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style lang="postcss">
	@media (min-width: theme(screens.md)) and (max-width: 1270px) {
		.list-item {
			.list-link.main-nav {
				@apply text-[11px];
			}
		}
	}

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

	.nav-menu {
		color: white;
		display: flex;
		text-transform: uppercase;
		margin-top: 40px;
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
