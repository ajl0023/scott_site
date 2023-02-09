<script>
	import { image_url } from '../dev';
	import mag_icon from '$lib/images/mag-icon.png';
	import IntersectionObserver from './IntersectionObserver.svelte';
	import MiniLogo from './MiniLogo.svelte';
	export let data;
	const images = data['url_image'];
</script>

<div class="wrapper mt-32">
	<div class="content-container md:w-100">
		<div class="title-container mb-9">
			<MiniLogo />
			<div class="title-text-container">
				<h2 class="text-[90px] md:text-[120px]">
					Global <span class="md:text-[55px] text-[30px]">Luxury Listings.</span>
				</h2>
			</div>
		</div>
		<IntersectionObserver let:intersecting once="{true}">
			<div class="grid-container lg:grid-rows-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
				{#each images as img}
					<div class="grid-item grid-image aspect-w-16 aspect-h-9" class:zoom-in="{intersecting}">
						<div class="grid-content-container">
							<div class="image-container w-full h-full absolute">
								<img
									class="w-full h-full object-cover"
									src="{image_url + img['image']['data']['attributes']['url']}"
									alt=""
								/>
							</div>
							<div class="label-container">
								<span class="site_easing">{img['label']}</span>
								<div class="mag-icon">
									<img src="{mag_icon}" alt="" />
								</div>
							</div>
						</div>
					</div>
				{/each}
				<div
					class="grid-item text-container hidden lg:block aspect-w-16 aspect-h-9"
					class:zoom-in="{intersecting}"
				>
					<div class="grid-content-container">
						<div class="text-content">
							<h3>GLOBAL LUXURY LISTINGS</h3>
						</div>
					</div>
				</div>
			</div>
		</IntersectionObserver>
	</div>
</div>

<style lang="scss">
	.wrapper {
		position: relative;
		overflow: hidden;
		text-align: center;
	}
	.grid-item.grid-image {
		&::after {
			width: 100%;
			height: 100%;
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			background-color: rgba(0, 0, 0, 0.3);

			transition: all 0.3s ease-in-out;
		}
		&:hover {
			&::after {
				background-color: rgba(0, 0, 0, 0.76);
			}
			.mag-icon {
				visibility: visible;
				opacity: 1;
				top: 45px;
			}
		}
		.mag-icon {
			transition: all 0.3s ease-in-out;
			width: 34px;
			height: 34px;
			margin: 0 auto;
			opacity: 0;
			position: absolute;

			top: 0;
			left: 0;
			right: 0;
			z-index: 5;
		}
	}
	.grid-container {
		display: grid;

		width: 100%;
		.grid-item {
			width: 100%;
			height: 0;
			cursor: pointer;

			overflow: hidden;
			position: relative;
			text-align: center;
			.label-container {
				color: white;
				z-index: 2;
				position: relative;
				span {
					width: 100%;

					color: #ffffff;
					font-size: 30px;
					font-weight: 400;
					font-family: 'Barlow', sans-serif;
					text-transform: uppercase;
					position: relative;
				}
			}

			.grid-content-container {
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				top: 0;
				bottom: 0;
				right: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
		}

		.grid-item.text-container {
			background-color: #41a7c3;
			grid-area: 2/2;

			.text-content {
				height: 100%;
				position: absolute;
				display: flex;
				align-items: center;
				top: 0;
				bottom: 0;
				right: 0;
				left: 0;
				h3 {
					width: 100%;
					display: inline-block;

					padding: 48px 0 50px;
					color: #ffffff;
					font-size: 30px;
					font-weight: 600;
					font-family: 'Barlow Semi Condensed', sans-serif;
					text-transform: uppercase;
					line-height: 1;
					position: relative;
					&::before {
						width: 39px;
						height: 1px;
						content: '';
						position: absolute;
						left: 0;
						right: 0;
						margin: 0 auto;
						background-color: #ffffff;
						top: 0;
					}
					&::after {
						width: 39px;
						height: 1px;
						content: '';
						position: absolute;
						left: 0;
						right: 0;
						margin: 0 auto;
						background-color: #ffffff;
						bottom: 0;
					}
				}
			}
		}
	}

	.title-container {
		h2 {
			display: inline-block;
			vertical-align: top;
			color: #1b1b1b;

			font-weight: 600;
			font-family: 'Barlow Semi Condensed', sans-serif;
			text-transform: uppercase;
			letter-spacing: -0.025em;
			line-height: 80px;
			position: relative;
			&::after {
				width: 300%;
				height: 4px;
				content: '';
				position: absolute;
				top: 45px;
				right: 110%;
				background-color: rgba(0, 40, 82, 0.1);
			}
		}
		span {
			display: block;
			margin-top: 15px;
			color: #41a7c3;

			font-weight: 400;
			font-family: 'Source Sans Pro', sans-serif;
			letter-spacing: -0.05em;
			line-height: 1;
		}
	}
</style>
