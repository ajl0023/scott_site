<script>
	import CkContent from '$lib/components/CKContent.svelte';

	export let data;

	$: page_data = data['page_data'];
</script>

<div class="wrapper">
	<CkContent html="{page_data.content}" />
</div>

<style lang="scss">
	.wrapper {
		width: 100%;
	}
</style>
