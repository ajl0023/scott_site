<script>
	import { image_url } from '../../dev';

	export let data;
</script>

<div class="wrapper">
	<div class="container">
		<div class="copyright-container">
			<p class="copyright">
				{data['copyright']}
			</p>
			<p class="disclaimer">
				{data['disclaimer']}
			</p>
		</div>
		<div class="eh-logo-container">
			<img src="{image_url + data['eh_logo']['data']['attributes']['url']}" alt="" />
		</div>
		<div class="partner-logos-wrapper flex justify-center items-center flex-wrap">
			{#each data['partner_logos']['data'] as logo}
				<div class="partner-logo-container">
					<img src="{image_url + logo['attributes']['url']}" alt="" />
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.partner-logos-wrapper {
		// display: inline-flex;
		// align-items: center;
		// flex-wrap: wrap;
		// align-items: center;
		.partner-logo-container {
			margin: 0 6px;
			width: 50px;
			img {
				width: 100%;
				object-fit: contain;
			}
		}
	}
	.copyright-container {
		color: #ffffff;
		font-size: 15px;
		font-family: 'Source Sans Pro', sans-serif;
		p {
			margin-bottom: 25px;
		}
	}
	.eh-logo-container {
		width: 50px;
		display: block;
		margin: 20px auto;
		img {
			width: 100%;
			object-fit: contain;
			display: block;
		}
	}
	.wrapper {
		.container {
			margin: auto;
			text-align: center;
			max-width: 1170px;
			width: 100%;
		}
		position: relative;
		z-index: 3;
		padding: 50px 20px 80px 20px;
		background-color: rgba(0, 0, 0, 0.69);
	}
</style>
