<script>
	import ContactForm from './components/ContactForm.svelte';
	import _ from 'lodash-es';
	import parsePhoneNumber from 'libphonenumber-js';
	import { access_strapi_image, get_strapi_image_format } from '../../../lib/utils/utils';

	export let data;

	const { page_data } = data;
	const { profile_informations, logo, intro_text, artist_info } = page_data;
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
	<div class="flex flex-wrap">
		<div class="p-3">
			<div class="block max-w-full md:max-w-sm font-roboto">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Scott James</h5>
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

			<div class="form-wrapper w-full md:max-w-lg max-w-xl mb-8 basis-1/2 flex-1">
				<div>
					<ContactForm />
				</div>
			</div>
		</div>

		<div class="p-3 m-auto lg:m-0">
			<div class="logo-container lg-full p-3">
				<img src="{get_strapi_image_format(logo, 'medium')}" alt="" />
			</div>

			<div class="p-3">
				<div
					class="w-full max-w-xs bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
				>
					<a target="_blank" rel="noreferrer" href="{artist_info.link}">
						<div class="flex flex-col items-center pb-10">
							<img
								class="mb-3 shadow-lg object-cover object-left"
								src="{access_strapi_image(artist_info.image)}"
							/>

							<div class="p-3">
								<a
									target="_blank"
									rel="noreferrer"
									href="{artist_info.link}"
									class="text-sm hover:text-[#41A7C3] text-gray-500 font-semibold"
									>{artist_info.song_description}</a
								>
								<div class="w-full m-auto mt-3">
									<img src="{access_strapi_image(artist_info.logo)}" class="w-full" alt="" />
								</div>
							</div>
						</div>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>

<style></style>
