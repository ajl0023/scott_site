<script>
	export let data;
</script>

<div
	class="icon-wrapper flex space-x-2 flex-wrap lg:flex-nowrap w-full justify-center items-center md:items-baseline"
>
	{#each data as item}
		<div
			class="inline-block icon-container basis-1/4 lg:basis-1/6 text-black hover:text-[#41A7C3] transition-all"
		>
			<a href="{item.url}" class="block cursor-pointer text-center">
				<div
					class="icon font-agentImage_icon {item.icon} lg:text-[60px] text-[40px] inline-block"
				></div>
				<span
					class="font-sans uppercase leading-5 block  lg:text-[15px] text-[12px] line-clamp-2 lg:line-clamp-none"
					>{item.label}</span
				>
			</a>
		</div>
	{/each}
</div>
