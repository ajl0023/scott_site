<script>
	import { quintOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import IntersectionObserver from "svelte-intersection-observer";
	export let data;
	export let intersecting;
	const progress = tweened(0, {
		duration: 3000,
		easing: quintOut
	});
	$: {
		intersecting && progress.set(data['val']);
	}
</script>

<div class="wrapper md:px-4 py-5 md:py-0 text-center">
	<div
		class="counter text-[#41A7C3] lg:text-[62px] md:text-[30px] text-[40px] leading-none text-center mb-2"
	>
		{(data['start_char'] ? data['start_char'] : '') +
			Math.floor($progress) +
			(data['end_char'] ? data['end_char'] : '')}
	</div>
	<p
		class="tracking-[.25em] uppercase text-[17px] font-[500] text-[#b2b2b2] text-center line-clamp-2"
	>
		{data['label']}
	</p>
</div>
