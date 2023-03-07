<script>
	import { image_url } from '../dev';
	import { get_strapi_image_format } from '../utils/utils';
	import { getAnim } from '$lib/actions/get_anim.js';

	export let data;

	const services = data.data;
</script>

<div class="wrapper my-32">
	<div class="grid-container px-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
		{#each services as { attributes: { label, image, link, is_external_link }}, i }
			<div class="grid-item" use:getAnim="{i < 3 ? 'fade-in-down' : 'fade-in-up'}">
				<a
					target="{is_external_link ? '_blank' : ''}"
					rel="{is_external_link ? 'noreferrer' : ''}"
					href="{is_external_link ? link : `/${link}`}"
				>
					<div class="grid-content  p-5">
						<div class="image-container">
							<img data-src="{get_strapi_image_format(image, 'medium')}" alt="" class="lazy" />
						</div>
						<div class="text-container">
							<span>{label}</span>
						</div>
					</div>
					<div class="hover-line"></div>
				</a>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.grid-item {
		&:hover {
			.hover-line {
				&::after {
					width: 215px;
					height: 215px;
					opacity: 1;
				}
				&::before {
					width: 215px;
					height: 215px;
					opacity: 1;
				}
			}
			.text-container {
				span {
					&::before {
						opacity: 0;
					}
					&::after {
						opacity: 0;
					}
				}
			}
		}
	}
	.hover-line {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		margin: 0 auto;
		pointer-events: none;
		z-index: 5;

		&::before {
			left: 20px;
			bottom: 20px;
			border-left: 1px solid #ffffff;
			border-bottom: 1px solid #ffffff;
			width: 0%;
			height: 0%;

			opacity: 0;
			content: '';
			position: absolute;

			transition: all 0.3s ease-in-out;
		}
		&::after {
			width: 0%;
			height: 0%;

			top: 20px;
			right: 20px;
			border-top: 1px solid #ffffff;
			border-right: 1px solid #ffffff;

			opacity: 0;
			content: '';
			position: absolute;

			transition: all 0.3s ease-in-out;
		}
	}
	.grid-container {
		display: grid;

		width: 100%;
		max-width: 1423px;
		margin: auto;

		.grid-item {
			width: 100%;
			height: 0;
			cursor: pointer;

			padding-bottom: 73.24%;
			overflow: hidden;
			position: relative;
			text-align: center;

			.text-container {
				z-index: 2;
				position: relative;
				span {
					width: 100%;
					display: inline-block;

					padding: 35px 0;
					color: #ffffff;
					font-size: 36px;
					font-weight: 700;
					font-family: 'Barlow Semi Condensed', sans-serif;
					text-transform: uppercase;
					line-height: 1;
					letter-spacing: 0.02em;
					position: relative;
					&::before {
						width: 112px;
						height: 1px;
						content: '';
						position: absolute;
						left: 0;
						right: 0;
						margin: 0 auto;
						background-color: #ffffff;
						top: 0;
						transition: all 0.2s ease-in-out;
					}
					&::after {
						width: 112px;
						height: 1px;
						content: '';
						position: absolute;
						left: 0;
						right: 0;
						margin: 0 auto;
						background-color: #ffffff;
						bottom: 0;
						transition: all 0.2s ease-in-out;
					}
				}
			}
			.image-container {
				width: 100%;
				position: absolute;
				top: 0;
				bottom: 0;
				right: 0;
				left: 0;
				img {
					object-fit: cover;
					display: block;
					width: 100%;
					height: 100%;
					filter: grayscale(100%);
				}
			}
			&:nth-child(even) {
				&::after {
					background-color: rgba(183, 222, 232, 0.65);
					width: 100%;
					height: 100%;
					content: '';
					position: absolute;
					z-index: 1;
					top: 0;
					left: 0;
				}
			}
			&:nth-child(odd) {
				&::after {
					background-color: rgba(28, 28, 28, 0.71);
					width: 100%;
					height: 100%;
					content: '';
					position: absolute;
					z-index: 1;
					top: 0;
					left: 0;
				}
			}
		}
	}
	.grid-content {
		width: 100%;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
