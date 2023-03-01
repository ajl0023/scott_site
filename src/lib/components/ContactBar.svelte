<script>
	import Facebook from '$lib/images/icons/facebook.svelte';
	import Instagram from '$lib/images/icons/instagram.svelte';
	import Linkedin from '$lib/images/icons/linkedin.svelte';
	import Youtube from '$lib/images/icons/youtube.svelte';
	import Zillow from '$lib/images/icons/zillow.svelte';

	import Phone from '$lib/images/icons/phone.svelte';
	import { createEventDispatcher } from 'svelte';
	export let items;
	export let is_paused = false;
	const social_images = {
		instagram: Instagram,
		facebook: Facebook,
		linkedin: Linkedin,
		zillow: Zillow,
		youtube: Youtube,
		phone: Phone
	};
	const contacts = items.data;
	const dispatch = createEventDispatcher('audio_toggle');
</script>

<div class="wrapper fixed  lg:block hidden z-10 top-1/2 -translate-y-1/2 right-3 space-y-2">
	{#each contacts as { attributes: { contact_info, contact_info_type } }}
		{@const isPhone = contact_info_type === 'phone'}
		<div class=" {isPhone ? '' : ''} relative">
			<a
				target="{isPhone ? '' : '_blank'}"
				href="{isPhone ? `tel:${contact_info}` : contact_info}"
				rel="{isPhone ? '' : 'noreferrer'}"
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
	<div
		on:click="{() => {
			dispatch('audio_toggle');
		}}"
		on:keydown="{() => {
			dispatch('audio_toggle');
		}}"
		class="mt-3 icon-wrapper p-3 rounded-full cursor-pointer group hover:bg-[#3f88d5] transition-all items-center justify-center flex {is_paused
			? 'bg-[#cbcbcb]'
			: 'bg-[#3f88d5]'}"
	>
		<div
			class="icon-container w-[20px] h-[20px] block group-hover:text-white transition-all {is_paused
				? 'icon-paused text-black'
				: 'icon-playing text-white'} font-agentImage_icon -translate-y-[1px]"
		></div>
	</div>
</div>
