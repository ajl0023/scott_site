<script>
	import classNames from 'classnames';
	import gsap from 'gsap';
	import _ from 'lodash-es';
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
	class="menu-item-container group relative"
>
	<li
		class="list-item relative font-[500] text-white group-hover:after:w-full after:w-0 after:absolute after:bg-[#41a7c3] after:h-[1px] 
	after:left-0 after:right-0 after:-bottom-[5px] after:m-auto after:transition-[width] after:duration-300 after:ease-out after:pointer-events-none
	"
	>
		{#if parent_data['url']}
			<a
				on:mouseenter="{() => {
					is_hovered = true;
					dropDownAnim(true);
				}}"
				class="{classNames(
					'text-white no-underline transition-color duration-300 ease-out hover:text-[#41a7c3]',
					{
						'text-xs main-nav': !is_visible,
						'lg:text-md md:text-xs': is_visible
					}
				)}"
				href="{parent_data['url']}">{parent_data['title']}</a
			>
		{/if}
	</li>

	<div
		bind:this="{dropdown_parent}"
		class="padding-drop-container group-hover:pointer-events-auto absolute left-[calc(-200%-0.25rem)] right-[calc(-200%-0.25rem)] min-w-[205px] max-w-full mx-auto pt-[10px] pointer-events-none"
		class:hidden="{children.length <= 0}"
	>
		<div
			bind:this="{dropdown}"
			class="drop-down-container z-10 h-0 flex-col text-sm bg-[rgb(183,222,232)]/80 overflow-hidden"
		>
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

<style lang="css">
	@keyframes colorChange {
		from {
			color: white;
		}
		to {
			color: #41a7c3;
		}
	}
</style>
