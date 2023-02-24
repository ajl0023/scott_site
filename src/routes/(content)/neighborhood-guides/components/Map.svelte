<script>
	import los_angeles from '../images/los-angeles-small.png';
	import san_bernardino from '../images/sanbernardino-hover-small.png';
	import riverside from '../images/riverside-hover-small.png';
	import orange from '../images/orange-hover-small.png';
	import map from '../images/map-california.png';
</script>

<div class="aspect-ratio w-full relative">
	<div class="inner-aspect-container">
		<img src="{map}" alt="" class="w-full h-full" usemap="Map1" />
		<div
			class="maphover absolute  left-[53.7%] top-[75.9%]  w-[11.69%] m-auto inline-block"
			id="map_los_angeles"
		>
			<div
				class="map_txt map_san_bernardino absolute text-[6px]  md:text-[10px] lg:text-[12px] text-[white] top-[40%] left-[58%] transform -translate-x-1/2 -translate-y-1/2 map-text
		
		"
				data-id="map_san_bernardino"
			>
				<div class="text-center whitespace-nowrap">Los Angeles<br />County</div>
			</div>
			<img class="map-cover" src="{los_angeles}" alt="map hover" />
		</div>
		<div
			class="maphover absolute  left-[64.6%] top-[65.4%]  w-[35%] m-auto inline-block"
			id="map_san_bernardino"
		>
			<div
				class="map_txt map_san_bernardino absolute text-[6px] md:text-[10px] lg:text-[12px] text-[white] top-1/2 left-[45%] transform -translate-x-1/2 -translate-y-1/2 map-text whitespace-nowrap"
				data-id="map_san_bernardino"
			>
				<span>San Bernardino</span>
			</div>
			<img src="{san_bernardino}" class="map-cover" alt="map hover" />
		</div>
		<div
			class="maphover absolute  left-[66.1%] top-[83.6%] text-[6px]  w-[30.7%] m-auto inline-block"
			id="map_riverside"
		>
			<div
				class="map-text map_san_bernardino absolute   md:text-[10px] lg:text-[12px] text-[white] top-1/2 left-[45%] transform -translate-x-1/2 -translate-y-1/2  whitespace-nowrap leading-none
		
		"
				data-id="map_san_bernardino"
			>
				<span>Riverside County</span>
			</div>
			<img class="map-cover" src="{riverside}" alt="map hover" />
		</div>
		<div
			class="maphover absolute  left-[61.4%] top-[85%] text-[6px]  w-[6.3%] m-auto inline-block"
			id="map_orange"
		>
			<div
				class="map-text map_san_bernardino absolute md:text-[10px] lg:text-[12px] text-[black] top-[114%] left-[-13%] transform -translate-x-1/2 -translate-y-1/2

"
				data-id="map_san_bernardino"
			>
				<span class="">Orange County</span>
			</div>
			<img class="map-cover" src="{orange}" alt="map hover" />
		</div>
	</div>
</div>
<map name="Map1" id="Map1">
	<!-- <area alt="Ventura" class="map_ventura" shape="poly" coords="407,754,406,808,417,819,421,820,424,824,425,831,438,839,442,840,456,830,465,828,467,823,469,817,447,766,440,763,424,762,419,757,413,755"/> -->

	<area
		alt="Los Angeles"
		class="map_los_angeles"
		shape="poly"
		coords="548,761,451,763,464,799,471,820,470,826,467,830,459,831,448,840,449,844,456,846,463,845,467,844,478,843,489,862,489,866,489,870,497,877,500,873,502,871,510,871,518,863,526,854,536,852,548,831,550,801,550,766"
	/>

	<area
		alt="Orange County"
		class="map_orange"
		shape="poly"
		coords="541,854,530,854,525,858,523,862,515,872,526,887,530,887,532,887,549,907,554,908,561,903,564,895,568,890,569,884,558,875,550,865,545,859"
	/>

	<area
		alt="San Bernardino"
		class="map_san_bernardino"
		shape="poly"
		coords="714,658,553,658,553,825,546,841,542,851,548,858,557,852,560,842,568,842,584,844,598,846,610,846,613,845,739,843,748,837,811,837,837,817,816,796,812,778,804,765,796,753,795,739,714,658"
	/>

	<area
		alt="Riverside"
		class="map_riverside"
		shape="poly"
		coords="812,840,747,840,736,846,612,847,589,847,580,845,563,844,552,859,553,867,571,884,565,897,586,906,798,906,805,893,807,872,807,863,805,854,812,844"
	/>
</map>

<style lang="scss">
	.map-text {
		pointer-events: none;
		z-index: 10;
		text-shadow: 0 -1px 2px #333333;
	}
	.map-cover {
		z-index: 5;
		opacity: 0;

		&:hover {
			opacity: 1;
		}
		//transition on hover
		transition: all 0.3s ease-in-out;
	}
</style>
