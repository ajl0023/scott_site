<script>
	import Mail from '../../images/icons/mail.svelte';
	import Phone from '../../images/icons/phone.svelte';
	import Wechat from '../../images/icons/wechat.svelte';
	import delogo from '$lib/images/footer-logo.png';

	import parsePhoneNumber from 'libphonenumber-js';
	export let data;

	let svg_data = {
		email: Mail,
		phone: Phone,
		wechat: Wechat
	};

	const get_format = (contact_type, contact_info) => {
		if ('phone' === contact_type) {
			return parsePhoneNumber(contact_info, 'US').formatNational();
		} else if ('DRE' === contact_type) {
			return '#' + contact_info;
		} else {
			return contact_info;
		}
	};
</script>

<div class="wrapper flex justify-center">
	<div class="container flex justify-center flex-col items-center">
		<div class="logo-container">
			<img src="{delogo}" alt="" />
		</div>
		<div
			class="contact-container flex flex-wrap  justify-center items-center flex-col md:flex-row md:space-y-0 space-y-2"
		>
			{#each data['contact'] as { attributes: { contact_info_type, contact_info } }}
				{@const contact_info_type_lower = contact_info_type.toLowerCase()}
				{@const is_dre = contact_info_type === 'DRE'}
				<div class="contact-item-container flex  items-center px-5">
					<div class="icon-container mr-2.5 {is_dre ? '' : 'md:w-8 w-5'}">
						{#if svg_data[contact_info_type_lower]}
							<svelte:component this="{svg_data[contact_info_type_lower]}" />
						{:else if is_dre}
							<p class="contact-text caldre">CalDRE</p>
						{/if}
					</div>
					<span class="contact-text text-sm font-semibold" href=""
						>{get_format(contact_info_type, contact_info)}</span
					>
				</div>
			{/each}
		</div>
		<div class="market-area-container mt-4">
			<ul
				class="market-area-list justify-center flex flex-wrap items-center text-center md:flex-row flex-col"
			>
				{#each data['market_areas'] as label}
					<li class="px-2 md:before:block before:hidden text-sm">
						<span>{label.label}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style lang="scss">
	.wrapper {
		width: 100%;
		background-color: #f8fbff;
		margin: auto;
	}
	.container {
		padding: 65px 20px;
		max-width: 1170px;
		width: 100%;

		.logo-container {
			margin-bottom: 30px;
		}
	}
	.market-area-container {
		.market-area-list {
			li {
				line-height: 1;
				color: #404040;

				font-family: 'Source Sans Pro', sans-serif;
				letter-spacing: 0.05em;
				pointer-events: none;

				position: relative;
				&:not(:first-child) {
					&::before {
						width: 4px;
						height: 4px;
						content: '';
						position: absolute;
						//center vertically
						top: 50%;
						transform: translateY(-50%);
						left: -3px;
						border-radius: 50%;
						background-color: #8d8d8d;
					}
				}
			}
		}
	}
</style>
