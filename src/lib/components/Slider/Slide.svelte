<script>
	import classNames from 'classnames';
	import { getContext, onMount } from 'svelte';
	import { access_strapi_image } from '../../utils/utils';

	let video;

	let current_time;
	export let slide_type;
	export let media;
	export let id;
	export let index;
	let animStore = getContext('animStore');
	// let shouldAnim = $animStore[index].shouldAnim;

	onMount(() => {
		animStore.setEle(video, index);

		//convert ms to seconds
	});
</script>

<div id="{id}" class="{classNames('slide-container absolute inset-0 opacity-0 fade')}">
	{#if slide_type === 'image'}
		<img
			class="slide lazy object-cover w-full h-full object-center"
			alt="'"
			bind:this="{video}"
			src="{access_strapi_image(media)}"
		/>{:else}
		<video
			bind:this="{video}"
			class="slide object-cover w-full h-full object-center"
			alt="'"
			src="{access_strapi_image(media)}"
			muted
			bind:currentTime="{current_time}"
			bind:duration="{$animStore[index].duration}"
		>
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
