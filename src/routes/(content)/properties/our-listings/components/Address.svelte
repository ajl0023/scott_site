<script>
	import { stateToAbbr } from '$lib/utils/utils';

	export let location_info;
</script>

<div class="wrapper">
	<div class="address-container">
		<h5>{location_info.address.street_address.toUpperCase()}</h5>

		<h5>
			{location_info.address.city.toUpperCase()},
			<span
				>{stateToAbbr(location_info.address.state_province)}
				{location_info.address.postal_code}</span
			>
		</h5>
	</div>
</div>
