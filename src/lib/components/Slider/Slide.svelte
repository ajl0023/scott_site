<script>
	import classNames from 'classnames';
	import { getContext, onMount } from 'svelte';
	import { access_strapi_image } from '../../utils/utils';

	export let slide_type;
	export let media;
	export let id;
	export let index;
	let media_element;

	let animStore = getContext('animStore');
	// let shouldAnim = $animStore[index].shouldAnim;

	onMount(() => {
		animStore.setEle(media_element, index);

		//convert ms to seconds
	});
</script>

<div id="{id}" class="{classNames('slide-container absolute inset-0 opacity-0 fade')}">
	{#if slide_type === 'image'}
		<img
			class="slide lazy object-cover w-full h-full object-center"
			alt="'"
			bind:this="{media_element}"
			src="{access_strapi_image(media)}"
		/>{:else}
		<video
			bind:this="{media_element}"
			class="slide object-cover w-full h-full object-center"
			alt="'"
			playsinline
			preload="auto"
			muted
		>
			<source src="{access_strapi_image(media)}" type="video/mp4" />
		</video>
	{/if}
</div>

<style lang="scss">
	.fade {
		transition: opacity 1.5s;
	}

	.fade-anim {
		opacity: 1;
	}
</style>
