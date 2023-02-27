<script>
	import { AsYouType } from 'libphonenumber-js';
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
</script>

<div class="w-full md:max-w-md max-w-lg">
	<form
		class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-10"
		bind:this="{form}"
		on:submit="{handleSubmit}"
		netlify
		name="contact-forms"
	>
		<div class="flex flex-wrap -mx-3 mb-6">
			<div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="first_name"
				>
					First Name
				</label>
				<input
					class="block w-full  text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
					id="first_name"
					type="text"
					placeholder="First Name"
				/>
			</div>
			<div class="w-full md:w-1/2 px-3">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="last_name"
				>
					last name
				</label>
				<input
					class="block w-full focus:outline-none  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight"
					id="last_name"
					type="text"
					placeholder="Last Name"
				/>
			</div>
		</div>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="email"> Email </label>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="email"
				type="email"
				placeholder="example@email.com"
			/>
		</div>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="phone"> Phone </label>
			<input
				on:input="{(e) => {
					phone_number = new AsYouType('US').input(e.target.value);
				}}"
				bind:value="{phone_number}"
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="phone"
				type="tel"
				placeholder="Phone"
			/>
		</div>

		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="additional_comments">
				Additional Comments
			</label>
			<textarea
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="additional_comments"
				rows="5"
				type="text"
				placeholder="Additional Comments"></textarea>
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
		<input type="hidden" name="form-submission" value="" />
	</form>
</div>
