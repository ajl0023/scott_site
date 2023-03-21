<script>
	import { get_strapi_image_format } from '../../utils/utils';
	import { createForm } from 'felte';
	import * as yup from 'yup';
	import MiniLogo from '../MiniLogo.svelte';
	export let data;
	import { reporter, ValidationMessage } from '@felte/reporter-svelte';
	import { validator } from '@felte/validator-yup';
	import { handleFormSubmit } from '$lib/utils/form_utils';
	import { Spinner, Toast } from 'flowbite-svelte';
	let submitted = false;
	const { form, isSubmitting } = createForm({
		initialValues: {
			name: '',
			email: '',
			message: ''
		},
		extend: [
			validator({
				schema: yup.object().shape({
					name: yup.string().required(),
					email: yup.string().email().required(),
					message: yup.string()
				})
			}),
			reporter
		],
		onSuccess: (values) => {
			submitted = true;
		},
		async onSubmit(values, context) {
			return handleFormSubmit('email-subscribe', values);
		}
	});
</script>

<div class="wrapper lazy" data-bg="{get_strapi_image_format(data, 'large')}">
	<div class="content-container p-3">
		<div class="title-container">
			<div class="logo-container">
				<MiniLogo color="white" />
			</div>
			<h2>Join My <span>Network</span></h2>
		</div>
		<div class="form-description">
			<p>Keep up to date in the latest market trends and opportunities in Los Angeles</p>
		</div>
		<div class="form-container">
			<form use:form>
				<div class="input-container">
					<div class="form-group">
						<label for="footname">Name</label>
						<input
							disabled="{$isSubmitting || submitted}"
							id="footname"
							type="text"
							name="name"
							required
							class="form-input disabled:opacity-50"
							placeholder="Name *"
						/>
						<ValidationMessage for="name" let:messages="{message}">
							<!-- We assume a single string will be passed as a validation message -->
							<!-- This can be an array of strings depending on your validation strategy -->
							<span class="text-sm text-red-600">{message || ''}</span>
						</ValidationMessage>
					</div>
					<div class="form-group">
						<label for="footemail">Email Address</label>
						<span class="input-span"
							><input
								disabled="{$isSubmitting || submitted}"
								type="email"
								name="email"
								required
								id="footemail"
								class="form-input disabled:opacity-50"
								placeholder="Email Address *"
							/></span
						>
						<ValidationMessage for="email" let:messages="{message}">
							<!-- We assume a single string will be passed as a validation message -->
							<!-- This can be an array of strings depending on your validation strategy -->
							<span class="text-sm text-red-600">{message || ''}</span>
						</ValidationMessage>
					</div>
				</div>
				<div class="form-group">
					<div class="foot_field">
						<label for="footmessage">Message</label>
						<textarea
							disabled="{$isSubmitting || submitted}"
							name="message"
							cols="40"
							rows="10"
							class="input-textarea disabled:opacity-50"
							placeholder="Message"></textarea>
					</div>
				</div>
				<div class="submit-btn-container sm:flex-row flex-col justify-center items-center flex ">
					<button
						disabled="{$isSubmitting || submitted}"
						type="submit"
						value="Submit"
						class="submit-btn sm:mr-5 disabled:pointer-events-none cursor-pointer disabled:opacity-50"
						id="foot_submit">Submit</button
					>
					{#if $isSubmitting}
						<Spinner />
					{/if}
					{#if submitted}
						<div class="thank-message flex mt-5 sm:mt-0">
							<svg
								aria-hidden="true"
								class="w-5 h-5 text-green-500 mr-2"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
								><path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"></path></svg
							>

							<span class="text-gray-400"> Thank you for subscribing! </span>
						</div>
					{/if}
				</div>
			</form>
		</div>
	</div>
</div>

<style lang="scss">
	.form-description {
		position: relative;
		p {
			color: #bdbdbd;
			font-size: 16px;
			font-weight: 300;
			line-height: 26px;
			letter-spacing: -0.02em;
		}
	}
	form {
		width: 100%;
		max-width: 740px;
		margin: 0 auto;
		position: relative;
		.submit-btn-container {
			margin-top: 45px;

			.submit-btn {
				width: 159px;
				height: 53px;

				display: inline-block;
				vertical-align: top;
				padding: 0;
				color: #ffffff;
				font-size: 12px;
				font-weight: 500;
				text-align: center;
				text-transform: uppercase;
				line-height: 51px;
				letter-spacing: 0.2em;
				border: 1px solid #b3b3b3;
				background-color: transparent;
				outline: none;

				transition: all 0.3s ease-in-out;
				&:hover {
					color: #1b1b1b;
					background-color: #b7dee8;
					border: 1px solid #b7dee8;
				}
			}
		}
		.input-container {
			width: 100%;
			display: flex;
			margin-bottom: 35px;

			.form-group {
				width: 100%;
			}
		}
		label {
			display: none;
		}

		.form-input {
			width: 100%;
			height: 75px;
			display: inline-block;

			padding: 0;
			color: #ffffff;
			font-size: 11px;
			text-transform: uppercase;
			letter-spacing: 0.07em;

			border: none;
			border-bottom: 1px solid rgba(255, 255, 255, 0.5);
			background-color: transparent;
			&::placeholder {
				color: white;
			}
		}
		.input-textarea {
			width: 100%;
			height: 75px;
			display: inline-block;

			padding: 0;
			color: #ffffff;
			font-size: 11px;
			text-transform: uppercase;
			letter-spacing: 0.07em;
			outline: none;

			resize: none;
			border: none;
			border-bottom: 1px solid rgba(255, 255, 255, 0.5);
			background-color: transparent;
			&::placeholder {
				color: white;
			}
		}
	}
	.wrapper {
		position: relative;

		text-align: center;
		background-size: cover;
		object-position: center;
		background-repeat: no-repeat;
		background-attachment: fixed;
		padding: 100px 0 115px;
		&::before {
			width: 100%;
			height: 100%;
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			background-color: rgba(21, 21, 21, 0.85);
		}
	}
	.content-container {
		margin: auto;
		max-width: 1200px;
		width: 100%;
	}
	.logo-container {
		margin: 0 0 10px 28px;
		padding-right: 46px;
		position: relative;
		font-size: 0;
	}
	.title-container {
		display: inline-flex;
		justify-content: flex-start;
		flex-direction: column;
		align-items: flex-start;
		margin: auto;
		margin-bottom: 25px;
		h2 {
			display: inline-block;
			vertical-align: top;
			color: #ffffff;
			font-size: 90px;
			font-weight: 700;
			font-family: 'Barlow Semi Condensed', sans-serif;
			text-transform: uppercase;
			letter-spacing: -0.025em;
			line-height: 57px;
			position: relative;
			&::after {
				width: 42%;
				max-width: 116px;
				height: 4px;
				content: '';
				position: absolute;
				bottom: 15px;
				left: 0;
				background-color: #818181;
			}
		}
		span {
			display: block;
			margin-top: 15px;
			padding-left: 130px;
			color: #41a7c3;
			font-size: 36px;
			font-weight: 400;
			font-family: 'Source Sans Pro', sans-serif;
			letter-spacing: -0.05em;
			line-height: 1;
		}
	}
</style>
