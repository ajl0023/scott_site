<script>
	import Facebook from '$lib/images/icons/facebook.svelte';
	import Instagram from '$lib/images/icons/instagram.svelte';
	import Linkedin from '$lib/images/icons/linkedin.svelte';
	import Youtube from '$lib/images/icons/youtube.svelte';
	import Zillow from '$lib/images/icons/zillow.svelte';

	import Phone from '$lib/images/icons/phone.svelte';
	import { createEventDispatcher, getContext } from 'svelte';
	export let items;

	const social_images = {
		instagram: Instagram,
		facebook: Facebook,
		linkedin: Linkedin,
		zillow: Zillow,
		youtube: Youtube,
		phone: Phone
	};
	const contacts = items.data;

	const audio_info_store = getContext('audio_info');
</script>

<div class="wrapper fixed  lg:block hidden z-20 top-[270px] right-3 space-y-2">
	{#each contacts as { attributes: { contact_info, contact_info_type } }}
		{@const isPhone = contact_info_type === 'phone'}
		<div class=" {isPhone ? '' : ''} relative">
			<a
				target="{isPhone ? '' : '_blank'}"
				href="{isPhone ? `tel:${contact_info}` : contact_info}"
				rel="{isPhone ? 'external' : 'noreferrer'}"
				class="icon-wrapper bg-[#cbcbcb] p-3 rounded-full cursor-pointer group hover:bg-[#3f88d5] transition-all flex items-center justify-center"
			>
				<div class="icon-container w-[20px] h-[20px] block group-hover:fill-white transition-all">
					<svelte:component this="{social_images[contact_info_type]}" />
				</div>
			</a>
			{#if isPhone}
				<div class="bg-gray-300 w-[2px] h-10 m-auto mt-1"></div>
			{/if}
		</div>
	{/each}

	<div class="bg-gray-300 w-[2px] h-8 m-auto mt-1"></div>
	<button
		on:click="{() => {
			const audio = $audio_info_store.audio;

			if (audio && audio.state() === 'loaded') {
				const playing = !$audio_info_store.is_paused;
				if (playing) {
					$audio_info_store.audio.pause();

					$audio_info_store.user_paused = true;
				} else {
					$audio_info_store.audio.play();

					$audio_info_store.user_paused = false;
				}
			}
		}}"
		class="mt-3 icon-wrapper p-3 rounded-full cursor-pointer group hover:bg-[#3f88d5] transition-all items-center justify-center flex {$audio_info_store.audio &&
		!$audio_info_store.audio.playing()
			? 'bg-[#cbcbcb]'
			: 'bg-[#3f88d5]'}"
	>
		<div
			class="icon-container w-[20px] h-[20px] block group-hover:text-white transition-all {$audio_info_store.audio &&
			!$audio_info_store.audio.playing()
				? 'icon-paused text-black'
				: 'icon-playing text-white'} font-agentImage_icon -translate-y-[1px]"
		></div>
	</button>
</div>
