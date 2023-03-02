import { writable } from 'svelte/store';

function createStore() {
	const state = [];
	const { subscribe, set, update } = writable(state);

	const methods = {
		start: () => {
			update((state) => {
				if (state[0].ele) {
					state[0].ele.play();
				}
				return state;
			});
		},
		swap: () => {
			update((state) => {
				const copy = [...state];

				const first = copy.shift();
				copy.push(first);
				let shallow = copy;

				return shallow;
			});
		},
		easeNext: () => {
			state[0].ele.play();
		},
		init: (eles) => {
			update((state) => {
				return [...eles];
			});
		}
	};
	return { ...methods, subscribe, set, update };
}

export const animStore = createStore();
