<script>
	import { image_url } from '../dev';
	import Counter from './Counter.svelte';
	import IntersectionObserver from './IntersectionObserver.svelte';
	import MiniLogo from './MiniLogo.svelte';

	export let data;
	let bg_photo = image_url + data['background_photo']['data']['attributes']['url'];
	const d_data = [
		{ start_char: '$', label: 'total sales approx', val: 134, end_char: '+M' },
		{
			label: 'total cities',
			val: 25
		},
		{
			label: 'represented buyers',
			val: 35,
			end_char: '%'
		},
		{
			label: 'represented sellers',
			val: 70,
			end_char: '%'
		},
		{
			label: 'transactions',
			val: 46
		}
	];
</script>

<div
	class="wrapper font-barlow bg-cover bg-no-repeat bg-center bg-fixed"
	style="background-image: url({bg_photo}); "
>
	<div class="container m-auto font-[600]  z-10 relative text-center">
		<div class="content-container items-center inline-block mt-10">
			<div class="align-bottom text-[0] md:text-left"><MiniLogo /></div>
			<h2 class="uppercase text-white leading-[56px] lg:text-[90px] md:text-[80px] text-[9vw]">
				why work with me
			</h2>
			<span
				class="span-text block text-[#41A7C3] text-[36px] font-[400] uppercase md:text-right mt-3 before:hidden md:before:block md:before:w-[70%] text-center"
				>My Numbers</span
			>
		</div>

		<IntersectionObserver let:intersecting
			><div
				class="counter-container flex m-auto justify-center flex-col md:flex-row divide-x divide-[rgba(255,255,255,0.30)]"
			>
				{#each d_data as data}
					<div class="counter-container">
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
					max-width: 522px;
					height: 4px;
					content: '';
					position: absolute;
					bottom: 23px;
					left: 0;
					background-color: #818181;
				}
			}
		}
	}
</style>
