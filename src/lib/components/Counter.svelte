<script>
	import { quintOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	export let data;
	export let intersecting;
	const progress = tweened(0, {
		duration: 3000,
		easing: quintOut
	});

	function getPrefixAndSuffix(str) {
		const prefix = str.match(/^\D+/);
		const suffix = str.match(/\D+$/);
		const number = str.match(/\d+/);
		return {
			prefix: prefix ? prefix[0] : '',
			suffix: suffix ? suffix[0] : '',
			number: number ? number[0] : ''
		};
	}
	const suffix = getPrefixAndSuffix(data['value']).suffix;
	const prefix = getPrefixAndSuffix(data['value']).prefix;
	const parsedInt = parseInt(getPrefixAndSuffix(data['value']).number);

	$: {
		intersecting && progress.set(parsedInt);
	}
</script>

<div class="wrapper md:px-4 py-5 md:py-0 text-center">
	<div
		class="counter text-[#41A7C3] lg:text-[62px] md:text-[30px] text-[40px] leading-none text-center mb-2"
	>
		{prefix + Math.floor($progress) + suffix}
	</div>
	<p
		class="tracking-[.25em] uppercase text-[17px] font-[500] text-[#b2b2b2] text-center line-clamp-2"
	>
		{data['label']}
	</p>
</div>
