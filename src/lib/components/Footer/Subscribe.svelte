<script>
	import logoSm from '$lib/images/logo-small.png';
	import { get_strapi_image_format } from '../../utils/utils';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	export let data;

	const { form, errors, state, handleChange, handleSubmit } = createForm({
		initialValues: {
			name: '',
			email: '',
			message: ''
		},
		validationSchema: yup.object().shape({
			name: yup.string().required(),
			email: yup.string().email().required(),
			message: yup.string()
		}),
		onSubmit: (values) => {
			fetch('/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams(values).toString()
			})
				.then(() => console.log('Form successfully submitted'))
				.catch((error) => alert(error));
		}
	});
</script>

<div class="wrapper lazy" data-bg="{get_strapi_image_format(data, 'large')}">
	<div class="content-container p-3">
		<div class="title-container">
			<div class="logo-container">
				<img src="{logoSm}" alt="" />
			</div>
			<h2>Join My <span>Network</span></h2>
		</div>
		<div class="form-description">
			<p>Keep up to date in the latest market trends and opportunities in Los Angeles</p>
		</div>
		<div class="form-container">
			<form
				method="post"
				data-netlify="true"
				name="join-my-network"
				on:submit="{(e) => {
					e.preventDefault();
					handleSubmit();
				}}"
			>
				<div class="input-container">
					<div class="form-group">
						<label for="footname">Name</label>
						<input
							type="text"
							name="name"
							bind:value="{$form.name}"
							size="40"
							class="form-input"
							id="footname"
							placeholder="Name *"
						/>
					</div>
					<div class="form-group">
						<label for="footemail">Email Address</label>
						<span class="input-span"
							><input
								type="email"
								name="email"
								size="40"
								bind:value="{$form.email}"
								class="form-input"
								id="footemail"
								placeholder="Email Address *"
							/></span
						>
					</div>
				</div>
				<div class="form-group">
					<div class="foot_field">
						<label for="footmessage">Message</label>
						<textarea
							name="message"
							cols="40"
							rows="10"
							bind:value="{$form.message}"
							class="input-textarea"
							id="footmessage"
							placeholder="Message"></textarea>
					</div>
				</div>
				<div class="submit-btn-container">
					<input type="submit" value="Submit" class="submit-btn" id="foot_submit" />
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
				cursor: pointer;
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
			outline: none;

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
			appearance: none;
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

		&::after {
			width: 38px;
			height: 5px;
			content: '';
			position: absolute;
			bottom: 13px;
			right: 0;
			background-color: #818181;
		}
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
