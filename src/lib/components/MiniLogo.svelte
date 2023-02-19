<script>
	import logoSm from '$lib/images/logo-small.png';
</script>

<div class="logo-container inline-block pr-[46px] relative ml-[5px]">
	<img class="w-full object-contain" src="{logoSm}" alt="" />
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
