<script>
	export let data;
	import { access_strapi_image } from '$lib/utils/utils';
</script>

<div class="wrapper">
	<div class="link-container">
		{#if data.is_file === true}
			<a href="{data.link}" download class="inline-block">
				<img class="w-full" src="{access_strapi_image(data.image)}" alt="" />
			</a>
		{:else}
			<a
				class="inline-block"
				href="{data.is_external_link ? data.link : '/' + data.link}"
				target="{data.is_external_link ? '_blank' : ''}"
				rel="{data.is_external_link ? 'noreferrer' : ''}"
			>
				<img class="w-full" src="{access_strapi_image(data.image)}" alt="" />
			</a>
		{/if}
	</div>
</div>
