<script>
	import Stars from './Stars.svelte';

	let form;
	const handleSubmit = (event) => {
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
	};
</script>

<div class="w-full max-w-md">
	<form
		class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
		bind:this="{form}"
		on:submit="{handleSubmit}"
		netlify
		name="form-submission"
	>
		<div class="flex flex-wrap -mx-3 mb-6">
			<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="name"
				>
					Name
				</label>
				<input
					class="block w-full  text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
					id="name"
					type="text"
					placeholder="Name"
				/>
			</div>
			<div class="w-full md:w-1/2 px-3">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="email"
				>
					email
				</label>
				<input
					class="block w-full focus:outline-none  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight"
					id="email"
					type="text"
					placeholder="example@email.com"
				/>
			</div>
		</div>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="website"> Website </label>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="website"
				type="text"
				placeholder="Website"
			/>
		</div>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="review-title">
				Review Title
			</label>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="review-title"
				type="text"
				placeholder="Review Title"
			/>
		</div>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="review"> Rating </label>
			<Stars active="{true}" />
		</div>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="review"> Review </label>
			<textarea
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="review"
				rows="5"
				type="text"
				placeholder="Review"></textarea>
		</div>
		<div class="flex items-center justify-between">
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
</div>
