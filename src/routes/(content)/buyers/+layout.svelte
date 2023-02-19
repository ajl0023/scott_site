<script>
	import IconBar from '../components/IconBar.svelte';

	const buyer_services = [
		{
			label: 'deciding to buy',
			icon: `icon-question`,
			url: 'deciding-to-buy'
		},
		{
			label: 'preparing to buy',
			icon: `icon-user`,
			url: 'preparing-to-buy'
		},

		{
			label: 'choosing a real estate agent',
			icon: 'icon-currency',
			url: 'choose-a-real-estate-agent'
		},
		{
			label: 'time to go shopping',
			icon: `icon-square-check`,
			url: 'time-to-go-shopping'
		},

		{
			label: 'escrow inspections & appraisals',
			icon: 'icon-house',
			url: 'escrow-inspections-and-appraisals'
		},
		{
			label: 'moving in',
			icon: 'icon-check',
			url: 'moving-in'
		}
	];
</script>

<div class="wrapper mt-[30px] lg:mt-[80px] mr-0 lg:mr-5">
	<IconBar data="{buyer_services}" />
	<div class="content-wrapper">
		<slot />
	</div>
</div>
