<script>
	import { access_strapi_image, stateToAbbr } from '$lib/utils/utils';

	import { browser } from '$app/environment';
	import _ from 'lodash-es';
	import Address from '../../../properties/our-listings/components/Address.svelte';

	import { getContext, onMount } from 'svelte';
	let Carousel;
	let mounted = false;
	onMount(async () => {
		Carousel = (await import('svelte-carousel')).default;
		mounted = true;
	});

	// this will have to be manually included in svelte kits routes, because these will be pre-rendered, but are not "static" pages

	export let data;
	const property_data = data['property_data'];
	let curr_carousel_index = 0;
	const {
		address,
		listing_id,
		description,
		price,
		images,
		list_by,
		location_info,
		interior_features,
		exterior_features,
		additional_info,
		property_type,
		nickname,
		property_note
	} = property_data;

	//sort by filename the same way windows does
	const collator = new Intl.Collator(undefined, { numeric: true });

	//sort images by filename
	images.data = images.data.sort((a, b) => {
		return collator.compare(a.attributes.name, b.attributes.name);
	});
	const property_type_map = {
		house: 'House',
		rental: 'Rental',
		lot: 'Lots /Land',
		['multi-unit residential']: 'Multi-Unit Residential'
	};
	const header_fields = {
		condo: () => [
			{
				label: 'Beds',
				val: interior_features['bedrooms']
			},
			{
				label: 'Baths',
				val: `${interior_features['full_baths']}|${interior_features['half_baths'] ?? 0}`
			},
			{
				label: 'Sq.Ft',
				val: exterior_features['approximate_size']
					? parseInt(exterior_features['approximate_size']).toLocaleString()
					: 'N/A'
			}
		],
		house: () => [
			{
				label: 'Beds',
				val: interior_features['bedrooms']
			},
			{
				label: 'Baths',
				val: `${interior_features['full_baths']}|${interior_features['half_baths'] ?? 0}`
			},
			{
				label: 'Sq.Ft',
				val: exterior_features['approximate_size']
					? parseInt(exterior_features['approximate_size']).toLocaleString()
					: 'N/A'
			}
			// {
			// 	label: 'Type',
			// 	val: property_type
			// }
		],
		rental: () => [
			{
				label: 'Beds',
				val: interior_features['bedrooms']
			},
			{
				label: 'Baths',
				val: `${interior_features['full_baths']}|${interior_features['half_baths'] ?? 0}`
			},
			{
				label: 'Sq.Ft',
				val: exterior_features['approximate_size']
					? parseInt(exterior_features['approximate_size']).toLocaleString()
					: 'N/A'
			}
			// {
			// 	label: 'Type',
			// 	val: property_type
			// }
		],
		lot: () => [
			// {
			// 	label: 'Type',
			// 	val: 'Lots / Land'
			// }
		],
		['multi-unit residential']: () => [
			{
				label: 'Number of Units',
				val: interior_features['total_number_of_units']
			}
			// {
			// 	label: 'Type',
			// 	val: property_type
			// }
		]
	};
	const category_order = [
		'interior_features',
		'exterior_features',

		'location_info',
		'additional_info'
	];
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
	const feature_fields_map = {
		true: 'Yes',
		false: 'No'
	};
	const value_mapper = (value) => {
		return feature_fields_map[value] || value;
	};
	const title = getContext('title');

	$title = `${
		location_info.address.street_address.trim().toUpperCase() +
		', ' +
		location_info.address.city.toUpperCase() +
		', ' +
		stateToAbbr(location_info.address.state_province) +
		' ' +
		location_info.address.postal_code
	}`;
</script>

<div class="wrapper w-full font-roboto">
	<div class="top-header flex">
		<h5 class="mb-5 text-xl font-serif text-gray-800 shadow-sm italic">{nickname ?? ''}</h5>
		<h5 class="mb-5 text-xl font-serif text-gray-800 shadow-sm italic">{property_note ?? ''}</h5>
	</div>
	<div
		class="font-roboto font-semibold text-gray-600 uppercase tracking-wider flex justify-between flex-row items-start md:text-base text-sm w-full"
	>
		<Address location_info="{location_info}" />
		<span class="text-right ml-4"
			>${parseInt(price).toLocaleString()}
			{property_type.toLowerCase() === 'rental' ? '(rental)' : ''}</span
		>
	</div>
	<div class="field-header-container  mt-10 flex justify-between">
		<div class="field-header-container flex space-x-4">
			{#each header_fields[property_type.toLowerCase()]() as { label, val }}
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
		<div class="mls-number">{listing_id}</div>
	</div>

	<!--left arrow svg -->

	{#if Carousel && browser}
		<div class="carousel-wrapper w-full h-full relative">
			<svelte:component
				this="{Carousel}"
				let:showPrevPage
				let:showNextPage
				let:loaded
				dots="{false}"
				on:pageChange="{(event) => {
					curr_carousel_index = event.detail;
				}}"
			>
				<div
					on:keydown
					on:click="{showPrevPage}"
					slot="prev"
					class="cursor-pointer arrow-container absolute top-[50%] translate-y-[-50%] left-5 z-10 bg-black rounded-full"
				>
					<svg
						class="arrow"
						xmlns="http://www.w3.org/2000/svg"
						width="30"
						height="30"
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

				{#each images.data as image, imageIndex (image.id)}
					<div class="carousel-item bg-gray-200 aspect-h-12 aspect-w-16 w-full relative">
						{#if loaded.includes(imageIndex)}
							<img
								draggable="{false}"
								class="object-cover w-auto h-full m-auto"
								src="{access_strapi_image(image)}"
								alt="{image.alt}"
							/>
						{/if}
					</div>
				{/each}
				<div
					on:keydown
					on:click="{showNextPage}"
					slot="next"
					class="cursor-pointer arrow-container absolute top-[50%] translate-y-[-50%] right-5 z-10 rotate-180 bg-black rounded-full"
				>
					<svg
						class="arrow"
						xmlns="http://www.w3.org/2000/svg"
						width="30"
						height="30"
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
			</svelte:component>
			<div
				class="absolute bottom-5 
	left-[50%] transform -translate-x-1/2 
	bg-gray-400 text-white text-sm font-roboto font-medium px-2 py-1 rounded-md
	"
			>
				<span class="drop-shadow-md">
					{curr_carousel_index + 1} / {images.data.length}
				</span>
			</div>
			<!-- position bottom center -->
		</div>
	{/if}

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
	<!-- 
		the each below isnt working because interior_features is null for property type lot
	 -->
	<div class="features-wrapper">
		{#each category_order as category}
			{#if feature_fields[category].data}
				<h2 class="font-medium font-roboto text-xl mt-16 mb-3">
					{feature_fields[category].label}
				</h2>
				<ul
					class="font-roboto font-normal text-sm text-gray-600 tracking-wider grid md:grid-cols-2 gap-x-[30px]"
				>
					{#each Object.entries(feature_fields[category].data) as [label, val]}
						{#if val && label !== 'id' && label !== 'address'}
							<li
								class="border-b border-gray-300 py-1 last:border-none 
						[&:nth-last-child(-n+2)]:border-none

					"
							>
								<!-- if label contains orsym, replace with /  -->

								<span class="font-medium"
									>{label.includes('orsym')
										? _.startCase(label).replace(/(orsym)/gi, '/')
										: _.startCase(label)}:</span
								>

								{#if typeof val === 'boolean'}
									{value_mapper(val)}
								{:else}
									{val}
								{/if}
							</li>
						{/if}
					{/each}
				</ul>
			{/if}
		{/each}
	</div>
</div>
<!-- src="{access_strapi_image(image)}" -->
