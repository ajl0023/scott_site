<script>
	import { getContext } from 'svelte';
	import { access_strapi_image } from '../utils/utils';

	
	export let color = 'black';
	const sj_logos = getContext('sj_logos');
</script>

<div class="logo-container inline-block pr-[46px] relative ml-[5px] max-w-[150px]">
	<img class="w-full object-contain" src="{access_strapi_image(sj_logos[color])}" alt="" />
</div>

<style lang="scss">
	.logo-container {
		&::after {
			width: 38px;
			height: 5px;
			content: '';
			position: absolute;
			bottom: 13px;
			right: 0;
			background-color: #41a7c3;
		}
	}
</style>
