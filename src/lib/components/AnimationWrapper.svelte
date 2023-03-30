<script>
	import IntersectionObserver from 'svelte-intersection-observer';
	export let ele;
	export let animation_name;
	let root = null;
</script>

<IntersectionObserver
	let:intersecting
	element="{ele}"
	animation_name="{animation_name}"
	once="{true}"
>
	<slot intersecting="{intersecting}" />
</IntersectionObserver>
