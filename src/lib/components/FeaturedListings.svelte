<script>
	import { getContext, onMount } from 'svelte';
	import { access_strapi_image, slugify_address, stateToAbbr } from '../utils/utils';
	import MiniLogo from './MiniLogo.svelte';
	import { createLazyStore } from '$lib/stores/lazy';
	import IntersectionObserver from 'svelte-intersection-observer';
	import _ from 'lodash-es';
	import AnimationWrapper from './AnimationWrapper.svelte';
	import { getAnim } from '$lib/actions/get_anim.js';
	export let data;
	//sort by price
	let listings = data.data.sort((a, b) => {
		return b.attributes.price - a.attributes.price;
	});

	if (listings.length > 5) {
		listings = listings.slice(0, 5);
	}
	onMount(() => {
		createLazyStore.init();
	});
</script>

<div class="container py-20">
	<div
		class="fl-container px-5 grid gap-1 md:grid-cols-2 grid-cols-1 lg:grid-cols-3"
		use:getAnim="{'fade-in'}"
	>
		<div class="pr-3 mb-2 md:mb-0 flex items-center lg:justify-start justify-center">
			<div class="font-barlow inline-block" use:getAnim="{'zoom-in'}">
				<MiniLogo />
				<h2
					class="text-header uppercase font-medium text-black-white leading-[56px] md:text-[70px] text-[50px] relative text-center"
				>
					Featured
				</h2>
				<div class="span-container">
					<span
						class="span-text text-[#41A7C3] text-[36px] font-[400] uppercase lg:mt-3 lg:text-[35px]"
						>Listings
					</span>
				</div>
			</div>
		</div>

		{#each listings as { attributes: { listing_id, address, thumbnail, price, location_info: { address: { street_address, state_province, postal_code } } } }}
			<a
				href="/homes-for-sale-details/{slugify_address(address)}/{listing_id}"
				class="block listing-container relative aspect-w-16 aspect-h-11"
			>
				<div class="content-wrapper">
					<div class="image-container w-full h-full">
						<img
							class="grayscale-0 lg:grayscale lazy w-full h-full"
							data-src="{access_strapi_image(thumbnail)}"
							alt=""
						/>
					</div>

					<div class="content-container absolute text-white bottom-0 z-[1] font-roboto pl-10">
						<div class="pl-3 border-l-2 border-white pb-5 inline-block">
							<h5 class="text-lg">
								${parseInt(price).toLocaleString()}
							</h5>
							<span class="inline-block lg:text-base text-sm">
								{_.startCase(street_address) +
									', ' +
									stateToAbbr(state_province.toLowerCase()).toUpperCase() +
									' ' +
									postal_code}
							</span>
						</div>
					</div>

					<div class="listing-hovered hidden lg:block aspect-w-16 aspect-h-11">
						<div class="content-wrapper">
							<img
								class="listing-image lazy w-full h-full"
								data-src="{access_strapi_image(thumbnail)}"
								alt=""
							/>

							<div
								class="content-container absolute text-black bottom-0 left-0 z-[1] font-roboto max-w-[230px] w-full"
							>
								<div class="bg-[#B7DEE8] pl-10 py-6">
									<h5 class="text-2xl font-semibold">
										${parseInt(price).toLocaleString()}
									</h5>
									<span class="">
										{_.startCase(street_address) +
											', ' +
											stateToAbbr(state_province.toLowerCase()).toUpperCase() +
											' ' +
											postal_code}
									</span>
									<span class="uppercase block mt-5 text-sm font-medium">view details +</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</a>
		{/each}
		<div class="view-more-container  aspect-w-16 aspect-h-11">
			<div class="flex items-center justify-center">
				<a class="view-more-button" href="/properties/our-listings">view all properties+</a>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.span-container {
		text-align: right;

		span {
			position: relative;
			&::before {
				position: absolute;
				width: 600px;
				margin-right: 10px;
				display: block;
				height: 4px;

				content: '';

				background-color: #d7d7d7;

				top: 50%;
				transform: translateY(-50%);
				right: 100%;
			}
		}
	}
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

	.listing-container {
		position: relative;
		@for $i from 1 through 6 {
			&:nth-child(#{$i}) {
				@if $i ==2 {
					.listing-hovered {
						top: 0;
					}
				}
				@if $i ==3 {
					.listing-hovered {
						top: 0;
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
