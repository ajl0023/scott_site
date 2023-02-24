<script>
	import gsap from 'gsap';
	export let nav_item;

	let dropdown;

	let dropdown_pointer = false;
	const dropDownAnim = (isOver) => {
		gsap.to(dropdown, {
			height: isOver ? 'auto' : 0,
			duration: 0.2
		});
	};
</script>

<!-- bind:this={parentEle}

on:blur -->
<div
	on:mouseenter="{() => {
		dropDownAnim(true);
	}}"
	on:mouseleave="{(e) => {
		dropDownAnim(false);
		dropdown_pointer = false;
	}}"
	class="mr-4 menu-item-container"
>
	<li class="list-item">
		<a
			on:mouseenter="{() => {
				dropdown_pointer = true;
			}}"
			class="list-link lg:text-lg md:text-sm"
			href="">{nav_item['label']}</a
		>
	</li>

	<div
		class="padding-drop-container {dropdown_pointer
			? 'pointer-events-auto'
			: 'pointer-events-none'}"
		class:hidden="{nav_item['nav_options'].length <= 0}"
	>
		<div bind:this="{dropdown}" class="drop-down-container">
			<ul class="list-drop-down-container">
				{#each nav_item['nav_options'] as sub_nav}
					<li class="list-item-sub cursor-pointer py-2 px-2  hover:bg-[#41a7c3] text-center font-semibold">
						<a
							class="list-link-sub block whitespace-normal"
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
			.list-link {
				@apply text-[12px];
			}
		}
	}

	.padding-drop-container {
		padding-top: 10px;
		position: absolute;
		left: -200%;
		right: -200%;
		min-width: 205px;

		max-width: 100%;
		margin: 0 auto;
	}
	.drop-down-container {
		display: flex;
		flex-direction: column;

		font-size: 14px;
		background-color: rgba(183, 222, 232, 0.8);

		height: 0;

		overflow: hidden;
		transition: max-height 0.3s ease-out;
	}
	.menu-item-container {
		position: relative;

		&:first-child {
			margin-left: 0;
		}
		&:last-child {
			margin-right: 0;
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

		&:hover::after {
			width: 100%;
		}
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
