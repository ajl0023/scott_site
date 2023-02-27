<script>
	import Hamburger from '../images/icons/hamburger.svelte';
	import SideNavButton from './SideNavButton.svelte';
	export let menu_items;

	let input;
	let expanded = {
		is_expanded: false,
		index: null,
		should_nav: false
	};
	const handleExpand = (i) => {
		const copy = { ...expanded };
		copy['index'] = i;
		copy['is_expanded'] = true;

		expanded = copy;
	};
</script>

<div class="side-nav-wrapper">
	<label for="side-nav" class="z-10 relative">
		<div class="mobile-icon-container w-4 relative cursor-pointer ">
			<Hamburger />
		</div>
	</label>
	<input bind:this="{input}" id="side-nav" type="checkbox" class="opacity-0 absolute -z-10" />
	<div class="side-nav-container">
		<ul>
			{#each menu_items as item, i}
				<SideNavButton
					data="{item}"
					handleExpand="{handleExpand}"
					index="{i}"
					on:close-nav="{() => {
						input.checked = false;
					}}"
					expanded="{expanded}"
				/>
			{/each}
		</ul>
	</div>
	<div
		class="side-menu-mask"
		on:click="{() => {
			input.checked = false;
		}}"
		on:keydown="{() => {
			input.checked = false;
		}}"
	></div>
</div>

<style lang="scss">
	.side-nav-container {
		width: 0;
		overflow: hidden;
		transition: all 0.4s ease-in-out;
		left: 0;
		bottom: 0;
		top: 0;
		position: fixed;
		z-index: 20;
		background-color: white;
	}
	.side-menu-mask {
		transition: all 0.4s ease-in-out;
		opacity: 0;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 19;
		position: fixed;
		height: 100%;
		width: 100%;
		background: rgba(0, 0, 0, 0.5);
		pointer-events: none;
	}
	#side-nav:checked ~ .side-menu-mask {
		opacity: 1;
		pointer-events: all;
		background: rgba(0, 0, 0, 0.5);
	}
	#side-nav:checked ~ .side-nav-container {
		width: 300px;
	}
</style>
