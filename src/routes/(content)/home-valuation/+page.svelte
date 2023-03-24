<script>
	import * as yup from 'yup';
	import Form from '../../../lib/components/Form.svelte';

	import { Select } from 'flowbite-svelte';
	import { Textarea } from 'flowbite-svelte';
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
					name: 'date_of_move',
					label: 'Approximate Date of Move',
					type: 'text',

					validation: yup.string(),
					sub_fields: [],
					required: false,
					placeholder: 'MM/DD/YYYY'
				},
				{
					name: 'method_of_contact',
					label: 'Preferred Method of Contact',
					type: 'text',
					component: Select,
					component_props: {
						items: [
							{ name: 'Phone', value: 'phone' },
							{ name: 'Email', value: 'email' },
							{ name: 'Text', value: 'text' }
						]
					},
					validation: yup.string(),
					sub_fields: [],
					required: false,
					placeholder: 'Preferred Method of Contact'
				}
			]
		},
		{
			header: 'Property Information',
			fields: [
				{
					name: 'property_type',
					label: 'Property Type',
					type: 'text',
					component: Select,
					component_props: {
						items: [
							{ name: 'Single Family Home', value: 'single_family_home' },
							{ name: 'Condominium/Townhouse ', value: 'condo_or_town' },
							{ name: 'Income Property', value: 'income_property' }
						]
					},
					validation: yup.string(),
					sub_fields: [],
					required: false,
					placeholder: 'Property Type'
				},

				{
					sub_fields: [
						{
							name: 'bedrooms',
							label: 'Bedrooms',
							type: 'text',
							component: Select,
							component_props: {
								items: [
									{ name: '1', value: '1' },
									{ name: '2', value: '2' },
									{ name: '3', value: '3' },
									{ name: '4', value: '4' },
									{ name: '5+', value: '5' }
								]
							},
							validation: yup.string(),
							class: 'md:w-1/2',
							required: false
						},
						{
							name: 'bathrooms',
							label: 'Bathrooms',
							type: 'text',
							component: Select,
							component_props: {
								items: [
									{ name: '1', value: '1' },
									{ name: '2', value: '2' },
									{ name: '3', value: '3' },
									{ name: '4', value: '4' },
									{ name: '5+', value: '5' }
								]
							},
							validation: yup.string(),
							class: 'md:w-1/2',
							required: false
						}
					]
				},
				{
					name: 'square_footage',
					label: 'Square Footage',
					type: 'text',

					validation: yup.string(),
					sub_fields: [],
					required: false,
					placeholder: 'Square Footage'
				},
				{
					name: 'additional_comments',
					label: 'Additional Comments',
					type: 'text',

					validation: yup.string(),
					sub_fields: [],
					required: false,
					placeholder: 'Any Additional Comments',
					component: Textarea,
					component_props: {
						rows: 5
					}
				}
			]
		}
	];
</script>

<div class="wrapper">
	<p class="text-lg mb-10 font-roboto text-[#666666]">
		Please provide the following information so we can contact you with your property valuation
		report.
	</p>
	<div class="max-w-2xl m-auto lg:m-0">
		<Form forms="{forms}" form_name="{'home-valuation'}" />
	</div>
</div>
