<script>
	import classNames from 'classnames';
	import { Popover } from 'flowbite-svelte';
	export let is_drop_down = false;
	export let should_show_nav_dropdown = false;

	export let curr_lang;
	export let should_render = false;
	const countries = [
		{ value: 'en', label: 'English' },
		{ value: 'pt', label: 'Portuguese' },
		{ value: 'es', label: 'Spanish' },
		{ value: 'fr', label: 'French' },
		{ value: 'nl', label: 'Dutch' },
		{ value: 'ja', label: 'Japanese' },
		{ value: 'zh-CN', label: 'Chinese' },
		{ value: 'ar', label: 'Arabic' },
		{ value: 'ru', label: 'Russian' },
		{ value: 'de', label: 'German' },
		{ value: 'it', label: 'Italian' }
	];

	const handleTranslate = (country) => {
		let domain = window.location.hostname;
		let val = '/en/' + country.value;

		if (country.value == 'en') {
			Cookies.remove('googtrans');
			Cookies.remove('googtrans', {
				domain: '.' + document.domain
			});
			window.location.reload();
			return;
		}
		/* If the default language is the same as the language we are translating into, then we clear the cookies */

		Cookies.set('googtrans', val);
		Cookies.set('googtrans', val, {
			domain: '.' + document.domain
		});

		if (domain == 'undefined') return;
		/* записываем куки для домена, если он назначен в конфиге */
		/* Writing down cookies for the domain, if it is assigned in the config */
		Cookies.set('googtrans', val, {
			domain: domain
		});

		Cookies.set('googtrans', val, {
			domain: '.' + domain
		});
		window.location.reload();
	};

	$: selected = countries.find((item) => {
		return item.value === curr_lang;
	});
</script>

{#if !should_render}
	<div class=""></div>
{/if}
{#if curr_lang && should_render}
	<div class="wrapper relative text-white">
		<button
			id="widget-trigger"
			class="list-link lg:text-md md:text-sm group cursor-pointer uppercase flex items-center"
		>
			<img class="mr-2 w-4 h-[11px]" src="{`/images/lang/lang__${selected.value}.png`}" alt="" />
			<span>
				{selected.label}
			</span>
		</button>
		<Popover
			trigger="click"
			arrow="{false}"
			placement="bottom"
			open="{is_drop_down ? (!should_show_nav_dropdown ? false : undefined) : undefined}"
		>
			<ul
				class="{classNames('bg-white text-black divide-y w-32', {
					// hidden: hidden,
					// block: !hidden
				})}
	"
			>
				{#each countries as country}
					<li>
						<button
							class="flex items-center w-full py-1"
							on:click="{() => {
								handleTranslate(country);
							}}"
						>
							<img
								class="mr-2 w-4 h-[11px]"
								src="{`/images/lang/lang__${country.value}.png`}"
								alt=""
							/>
							<div class="text-[10px]">
								{country.label}
							</div>
						</button>
					</li>
				{/each}
			</ul>
		</Popover>
	</div>
{/if}
