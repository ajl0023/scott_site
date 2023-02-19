<script>
	import MiniLogo from './MiniLogo.svelte';
</script>

<div class="wrapper">
	<div class="left-container">
		<div class="font-barlow title-container items-start lg:pl-6 flex flex-col ">
			<div class="align-bottom text-[0] text-center lg:text-left"><MiniLogo /></div>
			<h2
				class="text-header uppercase font-medium text-white leading-[56px] lg:text-[90px] text-[50px] relative text-center"
			>
				Media
			</h2>
			<span
				class="span-text lg:-mr-[50px] block text-[#41A7C3] text-[36px] font-[400] uppercase md:text-right lg:mt-3 before:hidden md:before:block text-center md:before:max-w-[450px] lg:before:max-w-[530px] lg:text-[35px]"
				>Relations
			</span>
		</div>
	</div>
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
