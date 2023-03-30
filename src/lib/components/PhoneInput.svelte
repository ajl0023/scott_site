<script>
	import { Input, Select } from 'flowbite-svelte';

	import { normalizedCountries } from '$lib/utils/allCountry';
	import { AsYouType } from 'libphonenumber-js';
	import { getContext } from 'svelte';

	export let placeholder;
	export let disabled;
	let phoneContext = getContext('phoneContext');
	let selected = normalizedCountries[232];

	$: ({ id, dialCode } = selected);
	let input = '';
	$: format = () => {
		input = new AsYouType(id).input(input || '');
	};
	$: phoneContext.update((value) => {
		value.dialCode = dialCode;
		value.country = id;
		return value;
	});
</script>

<div class="flex">
	<Select size="sm" class="w-auto" placeholder="" bind:value="{selected}" disabled="{disabled}">
		{#each normalizedCountries as country, i}
			<option value="{country}">{country.id + ` (+${+country.dialCode})`}</option>
		{/each}
	</Select>
	<Input
		disabled="{disabled}"
		name="phone"
		bind:value="{input}"
		placeholder="{placeholder}"
		on:input="{() => {
			format();
		}}"
	/>
</div>
