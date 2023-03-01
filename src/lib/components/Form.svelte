<script>
	export let form_name;
	export let forms;
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { AsYouType } from 'libphonenumber-js';
	import { Label, Input } from 'flowbite-svelte';
	let phone_number = '';
	let fields = forms.reduce((acc, form_block) => {
		acc.push(...form_block.fields);

		return acc;
	}, []);
	// const handleSubmit = (event) => {
	// 	event.preventDefault();

	// 	const myForm = event.target;
	// 	const formData = new FormData(myForm);

	// 	fetch('/', {
	// 		method: 'POST',
	// 		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	// 		body: new URLSearchParams(formData).toString()
	// 	});
	// };
	const { form, errors, state, handleChange, handleSubmit } = createForm({
		initialValues: {
			...fields.reduce((acc, field) => {
				if (field.sub_fields.length > 0) {
					field.sub_fields.forEach((sub_field) => {
						acc[sub_field.name] = sub_field.initial_value;
					});
				} else {
					acc[field.name] = field.initial_value;
				}
				return acc;
			}, {})
		},

		validationSchema: yup.object().shape(
			fields.reduce((acc, field) => {
				if (field.sub_fields.length > 0) {
					field.sub_fields.forEach((sub_field) => {
						acc[sub_field.name] = sub_field.validation;
					});
				} else {
					acc[field.name] = field.validation;
				}
				return acc;
			}, {})
		),
		onSubmit: async (values) => {
			// const formData = new FormData();
			// formData.append('formData', JSON.stringify(values));

			// await fetch('/api/forms', {
			// 	method: 'POST',
			// 	body: formData
			// });

			event.preventDefault();

			const myForm = event.target;
			const formData = new FormData(myForm);

			fetch('/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams(formData).toString()
			})
				.then(() => console.log('Form successfully submitted'))
				.catch((error) => alert(error));
		}
	});
</script>

<form on:submit="{handleSubmit}" name="{form_name}" class="" data-netlify="true">
	{#each forms as form_block, i}
		<div class="py-6">
			<h4 class="font-roboto uppercase text-2xl mb-3 font-semibold text-[#666666]">
				{form_block.header}
			</h4>
			{#if i === 0}
				<span> Required fields are marked with an asterisk (*) </span>
			{/if}
		</div>
		<div class="flex flex-wrap space-y-2 bg-white shadow-md rounded px-8 pt-6 pb-8">
			{#each form_block.fields as field}
				{#if field.sub_fields.length <= 0}
					<div class="w-full px-3">
						<Label for="{field.name}" class="block mb-2"
							>{field.label}
							{#if field.required}
								<span class="text-red-500 font-bold">*</span>
							{/if}
						</Label>
						{#if field.component}
							<svelte:component
								this="{field.component}"
								bind:value="{$form[field.name]}"
								placeholder="{field.placeholder}"
								required="{field.required}"
								id="{field.name}"
								size="md"
								{...field.component_props}
							/>
						{:else if field.name === 'phone'}
							<Input
								on:input="{(e) => {
									phone_number = new AsYouType('US').input(e.target.value);
								}}"
								name="{field.name}"
								bind:value="{$form[field.name]}"
								placeholder="{field.placeholder}"
								required="{field.required}"
								id="{field.name}"
								size="md"
							/>
						{:else}
							<Input
								name="{field.name}"
								placeholder="{field.placeholder}"
								required="{field.required}"
								id="{field.name}"
								size="md"
								bind:value="{$form[field.name]}"
							/>
						{/if}
					</div>
				{:else}
					<div class="flex flex-wrap w-full space-y-2 md:space-y-0">
						{#each field.sub_fields as sub_field}
							<div class="px-3 w-full {sub_field.class}">
								<Label for="{sub_field.name}" class="block mb-2"
									>{sub_field.label}
									{#if sub_field.required}
										<span class="text-red-500 font-bold">*</span>
									{/if}</Label
								>
								{#if sub_field.component}
									<svelte:component
										this="{sub_field.component}"
										bind:value="{$form[sub_field.name]}"
										placeholder="{sub_field.placeholder}"
										required="{sub_field.required}"
										id="{sub_field.name}"
										size="md"
										{...sub_field.component_props}
									/>
								{:else}
									<Input
										name="{sub_field.name}"
										placeholder="{sub_field.placeholder}"
										required="{sub_field.required}"
										id="{sub_field.name}"
										size="md"
										bind:value="{$form[field.name]}"
									/>
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			{/each}
		</div>
	{/each}
	<div class="flex items-center justify-between w-full pt-7">
		<button
			class="bg-[#303030] text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
			type="submit"
		>
			Submit
		</button>
		<!-- <button type="reset" class="inline-block align-baseline font-bold text-sm text-red-600">
			Cancel
		</button> -->
	</div>
</form>
