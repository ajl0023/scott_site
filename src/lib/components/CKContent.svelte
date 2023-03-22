<script>
	export let html;
</script>

<div
	class="ck-content wrapper mt-14 prose lg:prose-xl font-normal max-w-full pr-0 lg:pr-5 lg:text-left text-center font-roboto"
>
	{@html html}
</div>

<style lang="postcss">
	.ck-content {
		& :global(li) {
			list-style: inherit;
		}
	}

	.ck-content {
		text-align: center;
		& :global(li) {
			text-align: left;
		}
		@media screen(lg) {
			text-align: left;
		}
	}
</style>
