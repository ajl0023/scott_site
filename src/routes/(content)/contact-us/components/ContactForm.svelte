<script>
	import { AsYouType } from 'libphonenumber-js';
	import Form from '../../../../lib/components/Form.svelte';
	import * as yup from 'yup';
	import { Textarea } from 'flowbite-svelte';
	let form;
	let phone_number = '';
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
	const forms = [
		{
			header: 'Contact Us',
			fields: [
				{
					name: 'name',
					label: 'Name',
					type: 'text',
					initial_value: '',
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
					initial_value: '',
					required: true,
					validation: yup.string().email().required(),
					sub_fields: []
				},

				{
					name: 'phone',
					label: 'Phone',
					type: 'tel',
					placeholder: '123-456-7890',
					initial_value: '',
					required: false,
					validation: yup.string(),
					sub_fields: []
				},

				{
					name: 'additional_comments',
					label: 'Additional Comments',
					type: 'text',
					initial_value: '',
					validation: yup.string(),
					sub_fields: [],
					required: false,
					placeholder: 'Please let us know if you have any questions or concerns.',
					component: Textarea,
					component_props: {
						rows: 5
					}
				}
			]
		}
	];
</script>

<Form show_header="{false}" forms="{forms}" form_name="{'contact-form'}" />
