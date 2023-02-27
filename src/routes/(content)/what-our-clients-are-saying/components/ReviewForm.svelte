<script>
	import Stars from './Stars.svelte';
	import * as yup from 'yup';
	import Form from '../../../../lib/components/Form.svelte';
	import { Textarea } from 'flowbite-svelte';

	let form;
	const handleSubmit = (event) => {
		event.preventDefault();

		const myForm = event.target;
		const formData = new FormData(myForm);

		fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams(formData).toString()
		});
	};
	const fields = [
		{
			sub_fields: [
				{
					name: 'name',
					label: 'Name',
					type: 'text',
					placeholder: 'Full Name',
					validation: yup.string(),
					class: 'md:w-1/2',
					required: true
				},
				{
					name: 'email',
					label: 'Email',
					type: 'text',
					placeholder: '[...]@email.com',

					validation: yup.string(),
					class: 'md:w-1/2',
					required: true
				}
			]
		},

		{
			name: 'website',
			label: 'Website',
			type: 'text',

			validation: yup.string(),
			sub_fields: [],
			required: false,
			placeholder: 'example.com'
		},
		{
			name: 'review title',
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

			validation: yup.string(),
			sub_fields: [],
			required: true,
			placeholder: '',
			component: Stars,
			component_props: {
				active: true
			}
		},
		{
			name: 'review',
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
	];
</script>

<div class="w-full max-w-lg m-auto lg:m-0">
	<div class="form-container mb-4">
		<Form fields="{fields}" />
	</div>
</div>
