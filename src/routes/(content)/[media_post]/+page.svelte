<script>
	import _ from 'lodash-es';
	import { onMount } from 'svelte';
	import VideoEmbed from '../../../lib/components/VideoEmbed.svelte';
	import Carousel from './components/Carousel.svelte';
	import Header from './components/Header.svelte';
	import ImageLink from './components/ImageLink.svelte';
	import MediaCkContent from './components/MediaCkContent.svelte';

	export let data;
	const page_data = _.get(data['page_data'], 'data[0].attributes', null);

	

	const components = {
		'page-parts.content': MediaCkContent,
		'page-parts.video': VideoEmbed,
		'page-parts.carousel': Carousel,
		'page-parts.sub-header': Header,
		'page-parts.image-link': ImageLink
	};
</script>

<div class="wrapper font-roboto space-y-4">
	{#each page_data['page_parts'] as part}
		<svelte:component this="{components[part['__component']]}" data="{part}" />
	{/each}
</div>

<style lang="scss">
</style>
