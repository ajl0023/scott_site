<script>
	export let form_name;
	export let forms;
	export let show_header = true;
	export let submitHandler;
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { AsYouType } from 'libphonenumber-js';
	import { Label, Input } from 'flowbite-svelte';
	import { getInitialValues, getValidationSchema, netlifyFormSubmit } from '$lib/utils/form_utils';
	let phone_number = '';
	let fields = forms.reduce((acc, form_block) => {
		acc.push(...form_block.fields);

		return acc;
	}, []);
	const { form, errors, state, handleChange, handleSubmit } = createForm({
		initialValues: { ...getInitialValues(fields) },

		validationSchema: yup.object().shape(getValidationSchema(fields)),
		onSubmit: async (values) => {
			netlifyFormSubmit(form_name, values);
		}
	});

	const input_attrs = (field) => {
		return {
			placeholder: field.placeholder,
			required: field.required,
			id: field.name,
			size: 'md'
		};
	};
</script>

<form
	on:submit="{(e) => {
		e.preventDefault();
		handleSubmit();
	}}"
	name="{form_name}"
	class=""
	data-netlify="true"
>
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
										bind:value="{$form[field.name]}"
										{...field.component_props}
									/>
								{:else}
									<Input
										{...input_attrs(field)}
										bind:value="{$form[field.name]}"
										on:input="{(e) => {
											if (field.name === 'phone') {
												phone_number = new AsYouType('US').input(e.target.value);
											}
										}}"
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
												{...input_attrs(sub_field)}
												{...sub_field.component_props}
											/>
										{:else}
											<Input
												{...input_attrs(sub_field)}
												bind:value="{$form[sub_field.name]}"
												on:input="{(e) => {
													if (sub_field.name === 'phone') {
														$form[sub_field.name] = new AsYouType('US').input(e.target.value);
													}
												}}"
											/>
										{/if}
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
