<script>
	import { get_strapi_image_format } from '../../utils/utils';
	import ContactBanner from './ContactBanner.svelte';
	import LegalBanner from './LegalBanner.svelte';
	import Subscribe from './Subscribe.svelte';
	export let data;
	export let de_logo;
</script>

<div class="wrapper">
	<Subscribe data="{data['form_photo']}" />
	<div class="disclaimer-wrapper">
		<ContactBanner
			data="{{
				de_logo: de_logo,
				contact: data['profile_informations'].data,
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
			class="bg-photo lazy"
			data-bg="{get_strapi_image_format(data['form_photo'], 'large')}"
		></div>
	</div>
</div>

<style lang="scss">
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
