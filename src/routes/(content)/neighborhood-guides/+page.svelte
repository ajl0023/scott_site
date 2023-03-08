<script>
	import MiniLogo from '../../../lib/components/MiniLogo.svelte';
	import Map from './components/Map.svelte';

	import compass from './images/icon-compass.jpg';

	import flag from './images/logo-california.png';
</script>

<!-- because this page will always be static, 
    i can just get the images from the lib, i think 
-->
<div class="wrapper overflow-hidden text-center pb-20">
	<div class="inline-block">
		<div
			class="font-barlow title-container md:items-start flex flex-col md:mb-20 items-center justify-center"
		>
			<MiniLogo />
			<h2
				class="md:mt-4 text-header uppercase font-bold text-black leading-[56px] text-[40px] md:text-[90px] relative text-center"
			>
				neighborhood
			</h2>
			<div
				class="span-container w-full md:mt-4 md:before:block before:hidden justify-center md:justify-between"
			>
				<span class="span-text text-[#41A7C3] text-[25px] md:text-[50px] font-[400] uppercase"
					>guides</span
				>
			</div>
		</div>
	</div>
	<div class="flex justify-center flex-col-reverse lg:flex-row items-center lg:items-start">
		<div class="map-wrapper relative flex-shrink-0">
			<div class="img-container max-w-[500px] md:max-w-[700px] w-full">
				<Map />
			</div>
		</div>
		<div class="flex-col flex items-center lg:-ml-[250px] lg:mb-0 mb-10">
			<div class="item-container mb-5">
				<img src="{compass}" alt="" />
			</div>
			<div class="item-container">
				<img src="{flag}" alt="" />
			</div>

			<div
				class="item-container text-[50px] md:text-[92px] uppercase font-barlow font-bold text-[#41A7C3] leading-tight tracking-tighter"
			>
				<h1>California</h1>
			</div>
			<div class="button-container font-sourceSans mt-6 z-5 relative">
				<a
					href="https://scottjames.elliman.com/sales/usa"
					target="_blank"
					rel="noreferrer"
					class="text-white bg-[#303030] px-8 py-4 block transition-all hover:bg-[#41A7C3] uppercase"
					>Your Dream Home Awaits</a
				>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.span-container {
		display: flex;
		align-items: center;
		width: 100%;

		&::before {
			width: 100%;
			margin-right: 10px;

			height: 4px;

			content: '';

			background-color: #818181;
		}
	}
</style>
