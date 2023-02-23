<script>
	import { dev } from '$app/environment';
	import _ from 'lodash-es';
	import Listing from './components/Listing.svelte';
	import { slugify } from '$lib/utils/utils';
	import { slugify_address } from '../../../../lib/utils/utils';
	export let data;

	const listings = dev ? Array(10).fill(...data['page_data'].data) : data['page_data'].data;

	const getData = (data) => {
		_.get(data, 'data.attributes', null);
	};

	//will look into data and return the value attributes

	const listings_formatted = listings.map((item) => {
		return {
			interior_features: _.get(item, 'attributes.interior_features', null),

			thumbnail: _.get(item, 'attributes.thumbnail', null),
			property_data: {
				address: _.get(item, 'attributes.address', null),
				id: _.get(item, 'attributes.listing_id', null),
				type: _.get(item, 'attributes.property_type', null),
				price: _.get(item, 'attributes.price', null)
			}
		};
	});
</script>

<div class="wrapper">
	<div class="main-container">
		<!--  -->
		<div class="flex flex-wrap">
			{#each listings_formatted as { interior_features, property_data, thumbnail }}
				<!-- Listing component will have these props -->
				<Listing
					interior_features="{interior_features}"
					property_data="{property_data}"
					thumbnail="{thumbnail}"
					slug_url="{slugify_address(property_data.address)}"
				/>
			{/each}
		</div>
	</div>
</div>
