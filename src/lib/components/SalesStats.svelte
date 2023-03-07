<script>
	import { image_url } from '../dev';
	import Counter from './Counter.svelte';
	import IntersectionObserver from 'svelte-intersection-observer';
	import MiniLogo from './MiniLogo.svelte';
	import { get_strapi_image_format } from '../utils/utils';

	export let data;
	let bg_photo = get_strapi_image_format(data['background_photo'], 'large');

	let inter_ele;
	const stats = data['stats'];
</script>

<div
	id="hp_stats"
	class="lazy wrapper font-barlow bg-cover bg-no-repeat bg-center bg-fixed"
	data-bg="{bg_photo}"
>
	<div class="container m-auto font-[600] z-10 relative text-center py-20 px-4">
		<div class="content-container items-center inline-block">
			<div class="align-bottom text-[0] md:text-left lg:mb-2"><MiniLogo color="white" /></div>
			<h2 class="uppercase text-white leading-[56px] lg:text-[90px] md:text-[80px] text-[9vw]">
				why work with me
			</h2>
			<span
				class="span-text block text-[#41A7C3] text-[36px] font-[400] uppercase md:text-right mt-3 before:hidden md:before:block text-center md:before:max-w-[450px] lg:before:max-w-[530px]"
				>My Numbers</span
			>
		</div>

		<IntersectionObserver once="{true}" element="{inter_ele}" let:intersecting
			><div
				bind:this="{inter_ele}"
				class="counter-container flex m-auto justify-center items-center md:items-stretch flex-col md:flex-row md:divide-x md:divide-y-0 divide-y divide-[rgba(255,255,255,0.30)] px-20 md:px-2 md:mt-4"
			>
				{#each stats as data}
					<div class="counter-container w-full md:w-auto inline-block">
						<Counter data="{data}" intersecting="{intersecting}" />
					</div>
				{/each}
			</div>
		</IntersectionObserver>
	</div>
</div>

<style lang="scss">
	.wrapper {
		position: relative;

		&::before {
			width: 100%;
			height: 100%;
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
			background-color: rgba(42, 42, 42, 0.7);
			pointer-events: none;
		}
		.content-container {
			.span-text {
				position: relative;
				&::before {
					position: absolute;
					height: 4px;
					content: '';
					top: 50%;
					left: 0;
					transform: translateY(-50%);

					width: 100%;
					background-color: #818181;
				}
			}
		}
	}
</style>
