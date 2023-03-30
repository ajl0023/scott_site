import { writable } from 'svelte/store';

function createStore() {
	const state = [];
	const store = writable(state);
	const { subscribe, set, update } = store;

	//1. first start playing first video
	//2. when video reaches its offset time, set shouldAnim to true
	//3. when animation starts playing, start playing next video

	const methods = {
		setEle: function (ele, index, swap) {
			update((state) => {
				let copy = { ...state[index] };
				copy['ele'] = ele;
				copy['ended'] = () => {
					return new Promise((resolve, reject) => {
						if (copy.type === 'image') {
							setTimeout(() => {
								resolve();
							}, 3500);
						} else {
							ele.addEventListener('ended', () => {
								resolve();
							});
						}
					});
				};
				state[index] = copy;

				return state;
			});
		},

		init: (data) => {
			data.map((item) => {
				item['shouldAnim'] = false;
			});

			set(data);
		}
	};
	return { ...methods, subscribe, set, update };
}

export const getAnimStore = createStore;
