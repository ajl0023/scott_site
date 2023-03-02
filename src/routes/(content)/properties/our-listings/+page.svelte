<script>
	import { dev } from '$app/environment';
	import _ from 'lodash-es';
	import Listing from './components/Listing.svelte';
	import { slugify } from '$lib/utils/utils';
	import { slugify_address } from '../../../../lib/utils/utils';
	import Bed from '../../../../lib/images/icons/bed.svelte';
	import Bath from '../../../../lib/images/icons/bath.svelte';
	export let data;

	const listings = data['page_data'].data;

	const getData = (data) => {
		_.get(data, 'data.attributes', null);
	};

	//will look into data and return the value attributes

	const listings_formatted = listings.map((item) => {
		return {
			interior_features: _.get(item, 'attributes.interior_features', null),

			thumbnail: _.get(item, 'attributes.thumbnail', null),
			exterior_features: _.get(item, 'attributes.exterior_features', null),
			property_data: {
				address: _.get(item, 'attributes.address', null),
				id: _.get(item, 'attributes.listing_id', null),
				type: _.get(item, 'attributes.property_type', null),
				price: _.get(item, 'attributes.price', null)
			},
			location_info: _.get(item, 'attributes.location_info', null)
		};
	});
	//i want to define a listing_features object that will determine what to display in the listing component, but interior_features is undefined in lot, i might do it in the map above

	const features_to_display = {
		House: {
			features: [
				{
					key: 'bedrooms',
					category: 'interior_features',
					icon: Bed
				},
				{
					key: 'half_baths',
					category: 'interior_features',
					icon: Bath
				},
				{
					key: 'full_baths',
					category: 'interior_features',
					icon: null
				}
			]
		},
		Lot: {
			features: [
				{
					key: 'lot_size_in_sq_ft',
					category: 'exterior_features',
					icon: null
				}
			]
		},
		['Multi-Unit Residential']: {
			features: [
				{
					key: 'lot_size_in_sq_ft',
					category: 'exterior_features',
					icon: null
				}
			]
		}
	};
	const place_holders =
		listings_formatted.length % 2 == 0 ? listings_formatted.push('empty') : null;
</script>

<div class="wrapper m-auto lg:m-0">
	<div class="main-container">
		<div class="flex flex-wrap justify-center lg:justify-start">
			{#each listings_formatted as { interior_features, property_data, exterior_features, thumbnail, location_info }}
				<Listing
					exterior_features="{exterior_features}"
					interior_features="{interior_features}"
					property_data="{property_data}"
					thumbnail="{thumbnail}"
					location_info="{location_info}"
					slug_url="{slugify_address(property_data.address)}"
					features_to_display="{features_to_display[property_data.type].features}"
				/>
			{/each}
			{#if listings_formatted.length % 2 != 0}
				<div class="max-w-md min-w-[340px] w-1/2 flex-grow h-0"></div>
			{/if}
		</div>
	</div>
</div>
