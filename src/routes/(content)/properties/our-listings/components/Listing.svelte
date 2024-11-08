<script>
	import { get_strapi_image_format } from '$lib/utils/utils';
	import Address from './Address.svelte';

	export let property_data;
	export let interior_features;
	export let exterior_features;
	export let thumbnail;
	export let slug_url;
	export let location_info;
	let propertyType_to_display = {
		House: 'House',
		Lot: 'Lots / Land',
		'Multi-Unit Residential': 'Multi-Unit Residential',
		Rental: 'Rental'
	};

	let features_to_display = (type) => {
		if (type === 'house' || type === 'rental') {
			return [
				{
					key: 'Beds',
					val: interior_features['bedrooms']
				},
				{
					key: 'Baths',
					val: `${interior_features['full_baths']} | ${interior_features['half_baths'] || 0}`
				},
				{
					key: 'SqFt',
					val: `${
						parseInt(exterior_features['approximate_size'])
							? parseInt(exterior_features['approximate_size']).toLocaleString()
							: 'N/A'
					}`
				}
			];
		} else if (type === 'lot') {
			//sqft will be displayed with commas
			return [
				{
					key: 'Lot Acres',
					val: `${
						parseInt(exterior_features['lot_size_in_sq_ft'])
							? parseInt(exterior_features['lot_size_in_sq_ft']).toLocaleString()
							: 'N/A'
					}`
				}
			];
		} else if (type === 'multi-unit residential') {
			//sqft will be displayed with commas
			return [
				{
					key: 'Number of Units',
					val: `${
						parseInt(exterior_features['total_number_of_units'])
							? parseInt(exterior_features['total_number_of_units']).toLocaleString()
							: 'N/A'
					}`
				}
			];
		}
	};
</script>

<div class="antialiased font-sans inline-block max-w-lg min-w-[340px] w-1/2 flex-grow p-2">
	<div class="w-full inline-block">
		<div class="w-full sm:w-full lg:w-full">
			<a href="/homes-for-sale-details/{slug_url}/{property_data.id}" class="block">
				<div class="bg-white shadow-xl">
					<div class="h-56 overflow-hidden">
						<img
							class="object-cover w-full h-full"
							src="{get_strapi_image_format(thumbnail, 'medium')}"
							alt=""
						/>
					</div>
					<div class="p-4">
						<div class="flex justify-between">
							<p class="uppercase tracking-wide text-sm font-medium text-gray-700 mb-2">
								{property_data.nickname ?? '\u00A0'}
							</p>
							<span class="text-gray-500 font-light text-xs">
								{property_data.property_note ?? '\u00A0'}
							</span>
						</div>
						<p class="text-2xl text-gray-900">
							${parseInt(property_data.price).toLocaleString()}
						</p>
						<div class="address-container text-sm mt-3">
							<Address location_info="{location_info}" />
						</div>
					</div>
					<div class="flex p-4 border-t border-gray-300 text-gray-700">
						<!-- go through listing_features, and display different labels according to the object, the listing features is an object, so it has to be like [key,value] -->

						<div class="feature-wrapper flex divide-x-2">
							{#each features_to_display(property_data.type.toLowerCase()) as feature}
								<div class="feature flex flex-col items-center px-4">
									<span class="text-gray-900 font-medium text-sm">{feature.val}</span>
									<span class="text-sm">{feature.key}</span>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</a>
		</div>
	</div>
</div>
