<script>
	import Mail from '../../images/icons/mail.svelte';
	import Phone from '../../images/icons/phone.svelte';
	import Wechat from '../../images/icons/wechat.svelte';
	import delogo from '$lib/images/footer-logo.png';
	export let data;

	let svg_data = {
		email: Mail,
		phone: Phone,
		wechat: Wechat
	};
</script>

<div class="wrapper flex justify-center">
	<div class="container flex justify-center flex-col items-center">
		<div class="logo-container">
			<img src="{delogo}" alt="" />
		</div>
		<div class="contact-container flex flex-wrap  justify-center items-center">
			{#each Object.entries(data['contact']) as [key, val]}
				{#if key !== 'id'}
					<div class="contact-item-container flex  items-center px-5">
						{#if svg_data[key]}
							<div class="icon-container w-8 mr-2.5">
								<svelte:component this="{svg_data[key]}" />
							</div>
						{:else}
							<p class="contact-text caldre">CalDRE</p>
						{/if}
						<a class="contact-text" href="">{key === 'calDRE' ? '#' + val : val}</a>
					</div>
				{/if}
			{/each}
		</div>
		<div class="market-area-container">
			<ul class="market-area-list justify-center flex flex-wrap items-center text-center">
				{#each data['market_areas'] as label}
					<li class="px-3">
						<a>{label.label}</a>
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
		margin-top: 35px;

		.market-area-list {
			li {
				line-height: 1;
				color: #404040;
				font-size: 18px;
				font-family: 'Source Sans Pro', sans-serif;
				letter-spacing: 0.05em;
				pointer-events: none;

				position: relative;
				&:not(:first-child) {
					&::before {
						width: 6px;
						height: 6px;
						content: '';
						position: absolute;
						top: 6px;
						left: -3px;
						border-radius: 50%;
						background-color: #8d8d8d;
					}
				}
			}
		}
	}
</style>
