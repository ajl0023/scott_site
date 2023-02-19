<script>
	import IconBar from '../components/IconBar.svelte';

	const seller_services = [
		{
			label: 'deciding to sell',
			icon: `icon-question`,
			url: 'decide-to-sell'
		},
		{
			label: 'select an agent & price',
			icon: `icon-user`,
			url: 'select-an-agent-and-price'
		},

		{
			label: 'prepare to sell',
			icon: 'icon-currency',
			url: 'prepare-to-sell'
		},
		{
			label: 'accepting an offer',
			icon: `icon-square-check`,
			url: 'accepting-an-offer'
		},

		{
			label: 'escrow inspections & appraisals',
			icon: 'icon-house',
			url: 'escrow-inspections-and-appraisals'
		},
		{
			label: 'close of escrow',
			icon: 'icon-check',
			url: 'close-of-escrow'
		}
	];
</script>

<div class="wrapper">
	<IconBar data="{seller_services}" />
	<div class="content-wrapper">
		<slot />
	</div>
</div>

<style lang="scss">
</style>
