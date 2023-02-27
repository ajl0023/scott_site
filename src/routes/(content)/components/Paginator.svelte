<script>
	import { createEventDispatcher } from 'svelte';

	export let page;
	export let type;
	export let label;
	export let inactive;
	export let fetchData;
	export let active;
	const dispatch = createEventDispatcher();
</script>

<div
	class="wrapper bg-[#555] text-white hover:bg-[#3279BB] {active ? 'bg-[#3279BB]' : 'bg-[#555]'}"
	class:pointer-events-none="{inactive}"
	class:opacity-20="{inactive}"
>
	<button
		on:click="{() => {
			window.scrollTo(0, 0);

			fetchData();
		}}"
		class="block w-9 h-9 text-sm font-roboto">{label}</button
	>
</div>
