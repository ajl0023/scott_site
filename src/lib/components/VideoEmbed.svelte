<script>
	export let data;
	export let url;
	export let is_modal = false;

	function getYoutubeVideoId(url) {
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
		const match = url.match(regExp);

		if (match && match[2].length === 11) {
			return `https://www.youtube.com/embed/${match[2]}`;
		} else {
			return null;
		}
	}
	const embed_url = getYoutubeVideoId(url ? url : data.url);
</script>

{#if !is_modal}
	<div class="wrapper">
		<div class="video-container m-auto max-w-[800px] w-full">
			{#if data && data.label}
				<span class="mb-4 block">
					{data.label}
				</span>
			{/if}
			<div class="iframe-container aspect-w-16 aspect-h-9">
				<iframe
					class="lazy"
					title="video"
					width="100%"
					height="100%"
					data-src="{embed_url}"
					frameborder="0"
					allowfullscreen
				>
				</iframe>
			</div>
		</div>
	</div>
{:else}
	<div class="wrapper w-full">
		<div class="video-container w-full max-w-3xl">
			{#if data && data.label}
				<span class="mb-4 block">
					{data.label}
				</span>
			{/if}
			<div class="iframe-container aspect-w-16 aspect-h-9 w-full">
				<iframe
					title="video"
					width="100%"
					height="100%"
					src="{embed_url}"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				>
				</iframe>
			</div>
		</div>
	</div>
{/if}
