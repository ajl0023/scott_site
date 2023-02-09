<script>
	import { image_url } from '../../dev';
	import ContactBanner from './ContactBanner.svelte';
	import LegalBanner from './LegalBanner.svelte';
	import Subscribe from './Subscribe.svelte';
	export let data;
</script>

<div class="wrapper">
	<Subscribe data="{data['form_photo']['data']['attributes']}" />
	<div class="disclaimer-wrapper">
		<ContactBanner
			data="{{
				contact: data['contact_info'],
				market_areas: data['market_areas']
			}}"
		/>
		<LegalBanner
			data="{{
				disclaimer: data['disclaimer'],
				partner_logos: data['partner_logos'],
				copyright: data['copyright'],
				eh_logo: data['eh_logo']
			}}"
		/>
		<div
			class="bg-photo"
			style="background-image: url({image_url +
				data['copyright_photo']['data']['attributes']['url']});"
		></div>
	</div>
</div>

<style lang="scss">
	.wrapper {
	}
	.disclaimer-wrapper {
		position: relative;
	}
	.bg-photo {
		width: 100%;
		height: 100%;
		content: '';
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;

		background-size: cover;
		background-repeat: no-repeat;
		background-position: bottom center;
		background-attachment: fixed;
		pointer-events: none;

		filter: grayscale(100%);
		opacity: 0.24;
	}
</style>
