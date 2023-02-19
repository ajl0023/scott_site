<script>
	import testImg from '$lib/images/prop.jpg';
	import logoSm from '$lib/images/logo-small.png';
	import MiniLogo from './MiniLogo.svelte';
	const data = Array(4).fill('');
</script>

<div class="container">
	<div class="fl-container px-5 grid gap-1 md:grid-cols-2 grid-cols-1 lg:grid-cols-3">
		<div class="title-container flex flex-col justify-center pr-3 mb-4 md:mb-0">
			<div class="title-content flex flex-col items-center justify-center lg:items-start">
				<MiniLogo />
				<h2 class="inline-block text-[80px]">
					Featured <span class="text-center md:text-right">Listings</span>
				</h2>
			</div>
		</div>
		{#each data as listing}
			<div class="listing-container">
				<img class="listing-image grayscale-0 lg:grayscale" src="{testImg}" alt="" />

				<div class="listing-hovered hidden lg:block">
					<img class="listing-image" src="{testImg}" alt="" />
				</div>
			</div>
		{/each}
		<div class="view-more-container py-7 md:py-0">
			<a class="view-more-button" href="">view all properties+</a>
		</div>
	</div>
</div>

<style lang="scss">
	.view-more-container {
		background-color: #1b1b1b;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		.view-more-button {
			width: 250px;
			height: 53px;
			display: inline-block;
			vertical-align: middle;
			color: #ffffff;
			font-size: 12px;
			font-weight: 500;
			text-transform: uppercase;
			border: 1px solid #b3b3b3;
			line-height: 51px;

			text-decoration: none;
			transition: all 0.3s ease-in-out;
			&:hover {
				background-color: #41a7c3;
				border: 1px solid #41a7c3;
			}
		}
	}
	.container {
		max-width: 1500px;
		width: 100%;
		margin: auto;
	}
	.title-container {
		h2 {
			vertical-align: top;
			color: #1b1b1b;

			font-weight: 600;
			font-family: 'Barlow Semi Condensed', sans-serif;
			text-align: right;
			text-transform: uppercase;
			letter-spacing: -0.025em;
			line-height: 57px;
			position: relative;
			span {
				display: block;
				margin-top: 15px;
				color: #31849b;
				font-size: 36px;
				font-weight: 400;
				font-family: 'Source Sans Pro', sans-serif;
				letter-spacing: -0.05em;
				line-height: 1;
			}
		}
		.logo-container {
			position: relative;
			display: inline-block;
			padding-right: 40px;

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
	}
	.fl-container {
		width: 100%;
		margin-top: 10px;
	}
	.listing-container {
		@for $i from 1 through 6 {
			&:nth-child(#{$i}) {
				@if $i ==2 {
					.listing-hovered {
						top: 0;
					}
				}
				@if $i ==3 {
					.listing-hovered {
						right: 0;
					}
				}
				@if $i ==4 {
					.listing-hovered {
						left: 0;
						top: -30px;
					}
				}
				@if $i ==5 {
					.listing-hovered {
						left: auto;
						right: 0;
						top: -30px;
					}
				}
				@if $i ==6 {
					.listing-hovered {
						left: auto;
						right: 0;
						top: -30px;
					}
				}
			}
		}
		padding-bottom: 70%;
		position: relative;

		.listing-image {
			height: 100%;
			object-fit: cover;
			position: absolute;
			width: 100%;
		}
		.listing-image.hidden {
		}
		.listing-hovered {
			opacity: 0;
			width: calc(100% + 110px);
			height: calc(100% + 110px);
			position: absolute;

			transition: all 0.35s ease-in-out;

			z-index: 10;
			border: 4px solid white;
			transform: scale(0.7);
			.listing-image {
				filter: grayscale(0%);
			}
		}

		&:hover {
			.listing-hovered {
				opacity: 1;

				transform: scale(1);
			}
		}
	}
</style>
