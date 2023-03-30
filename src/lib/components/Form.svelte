<script>
	export let form_name;
	export let forms;
	export let show_header = true;

	import { reporter, ValidationMessage } from '@felte/reporter-svelte';
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import * as yup from 'yup';

	import { getInitialValues, getValidationSchema, handleFormSubmit } from '$lib/utils/form_utils';
	import { Input, Label, Spinner, Toast } from 'flowbite-svelte';
	import { isValidPhoneNumber } from 'libphonenumber-js';
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';

	let fields = forms.reduce((acc, form_block) => {
		acc.push(...form_block.fields);

		return acc;
	}, []);

	$: submitted = false;

	const phoneStore = writable({
		dialCode: '1',
		country: 'US'
	});
	setContext('phoneContext', phoneStore);
	const schema = yup.object().shape(getValidationSchema(fields));
	let contains_phone = schema.fields['phone'];
	// let contains_phone = schema.fields.includes('phone');

	const { form, isSubmitting, setData } = createForm({
		async onSubmit(values, context) {
			if (values.phone) {
				values.phone = '+' + $phoneStore.dialCode + values.phone.replace(/\D/g, '');
			}
			return handleFormSubmit(form_name, values);
		},
		validate: (values) => {
			const errors = {};
			const phoneValid = isValidPhoneNumber(values.phone || '', $phoneStore.country);
			if (contains_phone && (!values.phone || !phoneValid)) {
				errors.phone = 'Please enter a valid phone number';
			}
			return errors;
		},
		transform: (values) => {
			return values;
		},
		onSuccess: (values) => {
			submitted = true;
		},

		initialValues: { ...getInitialValues(fields) },
		extend: [validator({ schema }), reporter]
	});

	$: input_attrs = (field) => {
		return {
			placeholder: field.placeholder,
			required: field.required,
			id: field.name,
			size: 'md',
			name: field.name,
			disabled: submitted
		};
	};
	//set fields for email and rating and name
	onMount(() => {
		// setData('name', 'testing');
		// setData('email', 'test@email.com');
	});
</script>

<form use:form name="{form_name}">
	<div>
		{#each forms as form_block, i}
			<div class="[&:nth-child(n+2)]:mt-6">
				<div class="pb-2">
					{#if show_header}
						<h4 class="font-roboto uppercase text-2xl mb-3 font-semibold text-[#666666]">
							{form_block.header}
						</h4>
					{/if}
					{#if i === 0}
						<span class="text-gray-600"> Required fields are marked with an asterisk (*) </span>
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
										{...input_attrs(field)}
										{...field.component_props}
										setData="{setData}"
									/>
								{:else}
									<Input {...input_attrs(field)} bind:value="{field.initial_value}" />
								{/if}
								<ValidationMessage for="{field.name}" let:messages="{message}">
									<!-- We assume a single string will be passed as a validation message -->
									<!-- This can be an array of strings depending on your validation strategy -->
									<span class="text-sm text-red-600">{message || ''}</span>
								</ValidationMessage>
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
												{...input_attrs(sub_field)}
												{...sub_field.component_props}
											/>
										{:else}
											<Input
												{...input_attrs(sub_field)}
												on:input="{(e) => {
													if (sub_field.name === 'phone') {
														// $form[sub_field.name] = new AsYouType('US').input(e.target.value);
													}
												}}"
											/>
										{/if}
										<ValidationMessage for="{sub_field.name}" let:messages="{message}">
											<!-- We assume a single string will be passed as a validation message -->
											<!-- This can be an array of strings depending on your validation strategy -->
											<span class="text-sm text-red-600">{message || ''}</span>
										</ValidationMessage>
									</div>
								{/each}
							</div>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</div>
	<div class="flex items-center justify-between w-full pt-7">
		<button
			disabled="{submitted || $isSubmitting}"
			class="bg-[#303030] text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline disabled:opacity-50"
			type="submit"
		>
			Submit
		</button>
		<span>
			{#if $isSubmitting}
				<Spinner />
			{/if}
			{#if submitted}
				<Toast color="green" class="mb-2 border-none" simple="{true}">
					<svelte:fragment slot="icon">
						<svg
							class="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"></path></svg
						>
						<span class="sr-only">Check icon</span>
					</svelte:fragment>
					Successfully submitted!
				</Toast>
			{/if}
		</span>
		<!-- <button type="reset" class="inline-block align-baseline font-bold text-sm text-red-600">
            Cancel
        </button> -->
	</div>
</form>
