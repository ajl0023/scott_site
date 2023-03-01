<script>
	import ContactForm from './components/ContactForm.svelte';
	import _ from 'lodash-es';
	import parsePhoneNumber from 'libphonenumber-js';

	export let data;

	const { page_data } = data;
	const { profile_informations, logo, intro_text } = page_data;
	const get_format = (contact_type, contact_info) => {
		if ('phone' === contact_type) {
			return parsePhoneNumber(contact_info, 'US').formatNational();
		} else if ('DRE' === contact_type) {
			return '#' + contact_info;
		} else {
			return contact_info;
		}
	};
</script>

<div class="wrapper">
	<div class="flex items-start flex-wrap justify-center">
		<ContactForm />
		<div class="px-5">
			<div class="font-sans block max-w-full md:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Contact Information</h5>
				<p class="font-normal text-gray-700 dark:text-gray-400">
					{intro_text}
				</p>

				<div class="contact-wrapper mt-5 space-y-2">
					{#each profile_informations.data as { attributes: { contact_info_type, contact_info } }}
						<div class="">
							<h2 class="text-xl font-medium text-gray-800 mb-1">
								{_.startCase(contact_info_type)}:
							</h2>
							<p class="text-gray-600">
								{get_format(contact_info_type, contact_info)}
							</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style></style>
