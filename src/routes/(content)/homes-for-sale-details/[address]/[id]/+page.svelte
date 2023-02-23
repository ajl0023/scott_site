<script>
	import {
		access_strapi_image,
		get_strapi_image_format,
		stateToAbbr
	} from '../../../../../lib/utils/utils';
	import SV_Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	import _ from 'lodash-es';

	// this will have to be manually included in svelte kits routes, because these will be pre-rendered, but are not "static" pages

	export let data;
	const property_data = data['property_data'];
	const {
		address,
		description,
		price,
		images,
		list_by,
		location_info,
		interior_features,
		exterior_features,
		additional_info,
		property_type
	} = property_data;

	const header_fields = {
		house: [
			{
				label: 'Beds',
				val: interior_features['bedrooms']
			},
			{
				label: 'Baths',
				val: `${interior_features['full_baths']}|${interior_features['half_baths']}`
			},
			{
				label: 'Sq.Ft',
				val: parseInt(exterior_features['lot_size_in_sq_ft']).toLocaleString()
			},
			{
				label: 'Type',
				val: property_type
			}
		]
	};
	const feature_fields = {
		interior_features: {
			label: 'Interior Features',
			data: interior_features
		},
		exterior_features: {
			label: 'Exterior Features',
			data: exterior_features
		},
		additional_info: {
			label: 'Additional Information',
			data: additional_info
		},
		location_info: {
			label: 'Location Information',
			data: location_info
		}
	};
	const value_mapper = {
		true: 'Yes',
		false: 'No'
	};
</script>

<div class="wrapper max-w-[900px] w-full">
	<div class="font-roboto font-semibold text-gray-600 uppercase tracking-wider">
		<h5>{location_info.address.street_address}</h5>

		<h5>
			{location_info.address.city},
			<span
				>{stateToAbbr(location_info.address.state_province)}
				{location_info.address.postal_code}</span
			>
		</h5>
	</div>
	<div class="field-header-container flex space-x-4 mt-10">
		{#each header_fields.house as { label, val }}
			<div class="field-header">
				<span class="font-roboto font-normal text-sm text-gray-600 tracking-wider font-">
					{label}:
				</span>
				<span class="font-roboto font-normal text-sm text-gray-600 tracking-wider">
					{val}
				</span>
			</div>
		{/each}
	</div>

	<!--left arrow svg -->

	<div class="carousel-wrapperw-full">
		{#if browser}
			<SV_Carousel let:showPrevPage let:showNextPage>
				<div
					on:keydown
					on:click="{showPrevPage}"
					slot="prev"
					class="cursor-pointer arrow-container absolute top-[50%] translate-y-[-50%] left-0 z-10"
				>
					<svg
						class="arrow"
						xmlns="http://www.w3.org/2000/svg"
						width="50"
						height="50"
						viewBox="0 0 24 24"
						fill="none"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M15 18l-6-6 6-6"></path>
					</svg>
				</div>

				{#each images.data as image}
					<div class="">
						<div class="carousel-item bg-black aspect-h-12 aspect-w-16 w-full">
							<img
								class="object-cover w-full"
								draggable="false"
								src="{access_strapi_image(image)}"
								alt="{image.alternativeText}"
							/>
						</div>
					</div>
				{/each}
				<div
					on:keydown
					on:click="{showNextPage}"
					slot="next"
					class="cursor-pointer arrow-container absolute top-[50%] translate-y-[-50%] right-0 z-10 rotate-180"
				>
					<svg
						class="arrow"
						xmlns="http://www.w3.org/2000/svg"
						width="50"
						height="50"
						viewBox="0 0 24 24"
						fill="none"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M15 18l-6-6 6-6"></path>
					</svg>
				</div>
			</SV_Carousel>
		{/if}
	</div>
	<h2 class="font-medium font-roboto text-xl mt-16">About This Home</h2>
	<div class="agent-info-container roboto text-lg text-gray-600 ">
		<span>
			{list_by}
		</span>
	</div>
	<div class="description-container mt-10">
		<p class="font-roboto font-normal text-sm text-gray-600 tracking-wider">
			{description}
		</p>
	</div>

	<div class="features-wrapper">
		{#each Object.entries(feature_fields) as [feature_cat, feature]}
			<h2 class="font-medium font-roboto text-xl mt-16 mb-3">
				{feature_fields[feature_cat].label}
			</h2>
			<ul
				class="font-roboto font-normal text-sm text-gray-600 tracking-wider grid grid-cols-2 gap-x-[30px]"
			>
				{#each Object.entries(feature.data) as [label, val]}
					{#if val && label !== 'id' && label !== 'address'}
						<li
							class="border-b border-gray-300 py-1 last:border-none 
                            [&:nth-last-child(-n+2)]:border-none

                        "
						>
							<span class="font-medium">{_.startCase(label)}:</span>

							{#if typeof val === 'boolean'}
								{value_mapper[val]}
							{:else}
								{val}
							{/if}
						</li>
					{/if}
				{/each}
			</ul>
		{/each}
	</div>
</div>
<!-- src="{access_strapi_image(image)}" -->
