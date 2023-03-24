import { writable } from 'svelte/store';
import LazyLoad from 'vanilla-lazyload';
function createLazy() {
	const state = {
		lazy: null
	};
	const { subscribe, set, update } = writable(state);

	const methods = {
		init: () => {
			update((state) => {
				state.lazy = new LazyLoad();
				return state;
			});
		},
		update_lazy: () => {
			update((state) => {
				if (state.lazy) {
					state.lazy.update();
				}
				return state;
			});
		}
	};
	return { ...methods, subscribe };
}

export const createLazyStore = createLazy();
