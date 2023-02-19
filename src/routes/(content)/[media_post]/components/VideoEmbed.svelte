<script>
	export let data;

	function getYoutubeVideoId(url) {
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
		const match = url.match(regExp);

		if (match && match[2].length === 11) {
			return `https://www.youtube.com/embed/${match[2]}`;
		} else {
			return null;
		}
	}
	const embed_url = getYoutubeVideoId(data.url);
</script>

<div class="wrapper">
	<div class="video-container m-auto max-w-[800px] w-full">
		{#if data.label}
			<span class="mb-4 block">
				{data.label}
			</span>
		{/if}
		<div class="iframe-container aspect-w-16 aspect-h-9">
			<iframe
				title="video"
				width="100%"
				height="100%"
				src="{embed_url}"
				frameborder="0"
				allowfullscreen
			>
			</iframe>
		</div>
	</div>
</div>
