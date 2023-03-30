<script>
	import Form from '$lib/components/Form.svelte';
	import { Textarea } from 'flowbite-svelte';
	import * as yup from 'yup';
	import Stars from './Stars.svelte';

	let form;

	const forms = [
		{
			header: 'Leave a Review',
			fields: [
				{
					sub_fields: [
						{
							name: 'name',
							label: 'Name',
							type: 'text',
							placeholder: 'Full Name',
							validation: yup.string().required('Name is required'),
							class: 'md:w-1/2',
							required: true
						},
						{
							name: 'email',
							label: 'Email',
							type: 'email',
							placeholder: '[...]@email.com',

							validation: yup.string().email('Must be valid email').required('Email is required'),
							class: 'md:w-1/2',
							required: true
						}
					]
				},

			
				{
					name: 'title',
					label: 'Review Title',
					type: 'text',

					validation: yup.string(),
					sub_fields: [],
					required: false,
					placeholder: ''
				},
				{
					name: 'rating',
					label: 'Rating',
					type: 'text',

					validation: yup.string().required('Please select a rating.'),
					sub_fields: [],
					required: true,
					initial_value: '',
					placeholder: '',
					component: Stars,
					component_props: {
						active: true,
						id: 'input-rating'
					}
				},
				{
					name: 'content',
					label: 'Review',
					type: 'text',

					validation: yup.string(),
					sub_fields: [],
					required: false,
					placeholder: 'Tell us about your experience with us.',
					component: Textarea,
					component_props: {
						rows: 5
					}
				}
			]
		}
	];
</script>

<div class="w-full max-w-lg m-auto lg:m-0">
	<div class="form-container mb-4">
		<Form forms="{forms}" form_name="{'review_form'}" />
	</div>
</div>
