<script>
	export let fields;
	export let form_name;
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	import { Label, Input } from 'flowbite-svelte';

	const { form, errors, state, handleChange, handleSubmit } = createForm({
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
		onSubmit: (values) => {}
	});
</script>

<form
	action=""
	name="{form_name}"
	class="flex flex-wrap space-y-2 bg-white shadow-md rounded px-8 pt-6 pb-8 "
>
	{#each fields as field}
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
						placeholder="{field.placeholder}"
						require="{field.required}"
						id="{field.name}"
						size="md"
						{...field.component_props}
					/>
				{:else}
					<Input
						placeholder="{field.placeholder}"
						require="{field.required}"
						id="{field.name}"
						size="md"
					/>
				{/if}
				<!-- <Input
					placeholder="{field.placeholder}"
					require="{field.required}"
					id="{field.name}"
					size="md"
				/> -->
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

						<Input placeholder="{sub_field.placeholder}" required id="{sub_field.name}" size="md" />
					</div>
				{/each}
			</div>
		{/if}
	{/each}
	<div class="flex items-center justify-between w-full pt-7">
		<button
			class="bg-[#303030] text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
			type="submit"
		>
			Submit
		</button>
		<button type="reset" class="inline-block align-baseline font-bold text-sm text-red-600">
			Cancel
		</button>
	</div>
</form>
