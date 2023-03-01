<script>
	import * as yup from 'yup';
	import Form from '$lib/components/Form.svelte';
	import { get_strapi_image_format } from '$lib/utils/utils';
	import Modal from '$lib/components/Modal.svelte';
	import { access_strapi_image } from '../../../lib/utils/utils';
	export let data;
	const forms = [
		{
			header: 'Contact Information',
			fields: [
				{
					name: 'name',
					label: 'Name',
					type: 'text',

					placeholder: 'Full Name',
					required: true,
					validation: yup.string().required(),
					sub_fields: []
				},
				{
					name: 'email',
					label: 'Email',
					type: 'email',
					placeholder: '[...]@email.com',

					required: true,
					validation: yup.string().email().required(),
					sub_fields: []
				},
				{
					name: 'phone',
					label: 'Phone',
					type: 'tel',

					placeholder: '123-456-7890',
					required: true,
					validation: yup.string().required(),
					sub_fields: []
				},
				{
					name: 'address',
					label: 'Address',
					type: 'text',
					placeholder: '123 Main St',

					required: false,
					validation: yup.string(),
					sub_fields: []
				},
				{
					sub_fields: [
						{
							name: 'city',
							label: 'City',
							type: 'text',

							validation: yup.string(),
							class: 'md:w-1/3',
							required: false
						},
						{
							name: 'state',
							label: 'State',
							type: 'text',

							validation: yup.string(),
							class: 'md:w-1/3',
							required: false
						},
						{
							name: 'zip',
							label: 'Zip',
							type: 'text',

							validation: yup.string(),
							class: 'md:w-1/3',
							required: false
						}
					]
				},
				{
					name: 'desired_area',
					label: 'Desired Area',
					type: 'text',

					validation: yup.string(),
					sub_fields: [],
					required: false,
					placeholder: 'Desired Area, City, Zip, etc.'
				}
			]
		}
	];
	const { page_data } = data;
	const { intro_text, description, report: report_image } = page_data;

	let selectedImage = null;
</script>

<div class="wrapper font-roboto">
	<span class="mb-10 block">
		{intro_text}
	</span>

	<div class="mt-5 flex flex-wrap w-full justify-center items-center">
		<div class="form-container max-w-xl lg:max-w-[90%] basis-1/2 w-full flex-grow">
			<Form forms="{forms}" form_name="market_report" />
		</div>

		<div
			on:click="{() => {
				selectedImage = access_strapi_image(report_image.data);
			}}"
			class="image-container p-3 cursor-pointer"
		>
			<img
				class="max-w-sm h-auto  border-cyan-500 border-2"
				src="{get_strapi_image_format(report_image.data, 'small')}"
				alt=""
			/>
		</div>
	</div>
	<div class="mt-16">
		<h4 class="uppercase text-2xl mb-3 font-semibold text-[#666666]">about our reports</h4>
		<p>
			{description}
		</p>
	</div>

	<Modal
		form_name="market_report"
		bind:showModal="{selectedImage}"
		data="{selectedImage}"
		on:closeModal="{() => {
			selectedImage = null;
		}}"
	/>
</div>
