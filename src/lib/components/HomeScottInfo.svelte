<script>
	import { image_url } from '../dev';

	import IntersectionObserver from 'svelte-intersection-observer';
	import { onMount } from 'svelte';
	import MiniLogo from './MiniLogo.svelte';
	import AnimationWrapper from './AnimationWrapper.svelte';
	import { getAnim } from '$lib/actions/get_anim.js';

	export let data;

	let main_photo = image_url + data['agent_photo']['data']['attributes']['url'];
	let bg_photo = image_url + data['background_photo']['data']['attributes']['url'];
	let container;
</script>

<div class="wrapper mt-10 lg:mt-20 w-full px-5" bind:this="{container}">
	<div class="banner-container bg-cover bg-no-repeat grayscale lazy" data-bg="{bg_photo}"></div>

	<div class="lg:mt-[70px] container">
		<div
			class="flex main-content lg:flex-row flex-col lg:mt-[40px] lg:py-0 items-center lg:items-stretch p-8 lg:p-0 "
		>
			<div
				use:getAnim="{'fade-in-left'}"
				class="main-photo-container mt-0 lg:w-[40%] max-w-[400px] w-full lg:max-w-[100%]"
			>
				<img class="object-cover" src="{main_photo}" alt="" />
			</div>
			<div
				use:getAnim="{'fade-in-right'}"
				class="right-container flex flex-col justify-center items-center lg:px-10 lg:translate-y-[-40px] lg:w-[60%]"
			>
				<div class="title-container my-2 text-center lg:text-start lg:m-0 lg:self-start">
					<div
						class="font-barlow title-container lg:items-start flex flex-col md:mb-3 items-center"
					>
						<MiniLogo />
						<div class="header-container">
							<h2
								class="md:mt-4 mt-2 text-header uppercase font-[600] text-black leading-[56px] md:text-[130px] text-[90px] relative text-center"
							>
								scott
							</h2>
						</div>
						<div class="span-container w-full md:mt-4 mt-2 lg:text-end">
							<span class="span-text text-[#41A7C3] text-[30px] md:text-[70px] font-[400] uppercase"
								>james
							</span>
						</div>
					</div>
				</div>
				<div class="text-container text-center  lg:text-left">
					<h3>{data.header}</h3>
					<div class="text-content">
						{#each data.paragraph as paragraph}
							<p>{paragraph.text}</p>
						{/each}
					</div>
				</div>
				<div
					class="items-center lg:items-start button-container flex-col flex md:flex-row lg:justify-start justify-center w-full md:space-x-5 space-x-0 space-y-4 md:space-y-0 mb-3"
				>
					<a href="/scott-james" class="w-[200px] m-0">read more +</a>
					<a href="/awards-won" class="w-[200px]">awards won +</a>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.header-container {
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: space-between;
		position: relative;
		&::after {
			position: absolute;
			height: 4px;
			content: '';
			top: 50%;
			left: calc(100% + 60px);
			transform: translateY(-50%);
			z-index: 1;
			width: 100vw;
			background-color: rgba(0, 40, 82, 0.1);
		}
	}
	.button-container {
		a {
			height: 53px;
			display: inline-block;
			vertical-align: top;
			color: #1b1b1b;
			font-size: 12px;
			font-weight: 500;
			text-align: center;
			text-transform: uppercase;
			line-height: 51px;
			letter-spacing: 0.2em;
			border: 1px solid #b3b3b3;
			transition: all 0.3s ease-in-out;
			cursor: pointer;
			&:hover {
				color: #1b1b1b;
				background-color: #b7dee8;
				border: 1px solid #b7dee8;
			}
		}
	}
	.wrapper {
		position: relative;

		padding-bottom: 100px;

		.banner-container {
			z-index: 1;
			width: 100%;
			height: 100%;
			max-height: 696px;
			content: '';
			position: absolute;
			left: 0;
			bottom: 0;

			pointer-events: none;
			.banner {
				background-size: cover;
				background-position: bottom center;
				background-repeat: no-repeat;
				width: 100%;
				filter: grayscale(100%);
			}
		}
		&:after {
			display: block;
			width: 100%;
			height: 100%;
			max-height: 696px;
			content: '';
			position: absolute;
			z-index: 3;
			left: 0;
			bottom: 0;
			background-size: cover;
			background-position: bottom center;
			background-repeat: no-repeat;
			background-color: rgba(240, 240, 240, 0.85);
			pointer-events: none;
		}
	}
	.container {
		max-width: 1170px;
		width: 100%;
		margin: auto;
		z-index: 4;
		position: relative;
	}
	.main-photo-container {
		img {
			height: 100%;
			width: 100%;
		}
	}

	.text-container {
		h3 {
			margin-bottom: 10px;
			color: #494949;
			font-size: 24px;
			font-weight: 600;
			font-family: 'Source Sans Pro', sans-serif;
			text-transform: uppercase;
			line-height: 1;
			letter-spacing: -0.01em;
		}
		.text-content {
			p {
				color: #666666;
				font-size: 15px;
				font-weight: 300;
				line-height: 26px;
				margin-bottom: 30px;
			}
		}
	}
	.main-content {
		display: flex;
		background-color: white;

		.welcome-title {
			h2 {
				display: inline-block;
				vertical-align: top;
				color: #1b1b1b;

				font-weight: 600;
				font-family: 'Barlow Semi Condensed', sans-serif;
				text-align: right;
				text-transform: uppercase;
				letter-spacing: -0.025em;
				line-height: 80px;
				position: relative;
			}
			span {
				display: block;
				color: #41a7c3;

				font-weight: 400;
				font-family: 'Source Sans Pro', sans-serif;
				letter-spacing: -0.05em;
				line-height: 1;
			}
		}
	}
	.sm-logo-container {
		display: inline-block;
		vertical-align: top;
		// margin: 0 0 10px 5px;
		padding-right: 46px;
		position: relative;
		font-size: 0;
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
