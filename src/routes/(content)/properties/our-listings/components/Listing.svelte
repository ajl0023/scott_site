<script>
	import Bath from '../../../../../lib/images/icons/bath.svelte';
	import Bed from '../../../../../lib/images/icons/bed.svelte';
	import { get_strapi_image_format, slugify } from '../../../../../lib/utils/utils';

	export let property_data;
	export let interior_features;
	export let thumbnail;
	export let slug_url;

    console.log(property_data)
</script>

<div class="antialiased font-sans flex-[50%]">
	<div class="flex w-full">
		<div class="w-full sm:w-full lg:w-full py-2 px-2">
			<a href="/homes-for-sale-details/{slug_url}/{property_data.id}" class="block">
				<div class="bg-white shadow-xl">
					<div class="h-56 overflow-hidden rounded-lg">
						<img
							class="object-cover object-[center_center] w-full"
							src="{get_strapi_image_format(thumbnail, 'medium')}"
							alt=""
						/>
					</div>
					<div class="p-4">
						<p class="uppercase tracking-wide text-sm font-medium text-gray-700 mb-2">
							{property_data.type}
						</p>
						<p class="text-2xl text-gray-900">
							${parseInt(property_data.price).toLocaleString()}
						</p>
						<p class="text-gray-700">742 Evergreen Terrace</p>
					</div>
					<div class="flex p-4 border-t border-gray-300 text-gray-700">
						<div class="flex-1 inline-flex items-center">
							<Bed />
							<p>
								<span class="text-gray-900 font-bold">{interior_features.bedrooms}</span> Bedrooms
							</p>
						</div>
						<div class="flex-1 inline-flex items-center">
							<Bath />
							<p>
								<span class="text-gray-900 font-bold"
									>{interior_features.full_baths} | {interior_features.half_baths}</span
								> Bathrooms
							</p>
						</div>
					</div>
				</div>
			</a>
		</div>
	</div>
</div>
