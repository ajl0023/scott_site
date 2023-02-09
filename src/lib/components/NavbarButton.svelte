<script>
	import gsap from 'gsap';
	export let nav_item;
	let dropdown;
	let parentEle;
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
	}}"
	class="mr-4 menu-item-container"
>
	<li class="list-item">
		<a class="list-link lg:text-lg" href="">{nav_item['label']}</a>
	</li>
	<div class="padding-drop-container">
		<div bind:this="{dropdown}" class="drop-down-container">
			<ul class="list-drop-down-container">
				{#each nav_item['nav_options'] as sub_nav}
					<li class="list-item-sub">
						<a class="list-link-sub block" href=""> {sub_nav['label']}</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style lang="scss">
	.padding-drop-container {
		padding-top: 10px;
	}
	.drop-down-container {
		display: flex;
		flex-direction: column;
		position: absolute;
		min-width: 205px;
		font-size: 14px;
		background-color: rgba(183, 222, 232, 0.8);
		left: -200%;
		right: -200%;
		margin: 0 auto;
		max-width: 100%;

		height: 0;

		overflow: hidden;
		transition: max-height 0.3s ease-out;
		.list-item-sub {
			text-align: center;
			padding: 5px;
			font-weight: 500;
			&:hover {
				background-color: #41a7c3;
			}
		}
		.list-link-sub {
			color: white;
			text-align: center;
			text-decoration: none;
		}
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
