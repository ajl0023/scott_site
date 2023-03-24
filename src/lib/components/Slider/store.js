import { get, writable } from 'svelte/store';

function createStore() {
	const state = [];
	const store = writable(state);
	const { subscribe, set, update } = store;
	const offset = 0.5;
	let first_run = true;
	//1. first start playing first video
	//2. when video reaches its offset time, set shouldAnim to true
	//3. when animation starts playing, start playing next video

	const methods = {
		start: () => {
			// if(curr_state[0].type === 'image'){}
			const curr_state = get(store);

			curr_state[0].ele.play();
			const duration = curr_state[0].ele.duration;

			setTimeout(() => {
				update((state) => {
					// state[0].ele.parentElement.classList.add('fader');

					state[0].shouldAnim = true;

					return state;
				});
				methods.swap();
			}, (duration - offset) * 1000);
		},
		setEle: function (ele, index, swap) {
			update((state) => {
				let copy = { ...state[index] };
				copy['ele'] = ele;
				state[index] = copy;

				return state;
			});
		},
		swap: function () {
			update((state) => {
				const copy = [...state];

				const first = copy.shift();
				copy.push(first);

				return copy;
			});
		},
		easeNext: () => {
			const curr_state = get(store);

			if (curr_state[0].type === 'image') {
		
				setTimeout(() => {
					update((state) => {
						curr_state[0].shouldAnim = true;

						return curr_state;
					});
					// methods.swap();
				}, 2 * 1000);
				return;
			} else {
			
				curr_state[0].ele.play();
				setTimeout(() => {
					update((state) => {
						state[0].shouldAnim = true;

						return state;
					});
					methods.swap();
				}, 2 * 1000);
			}

			// const duration = curr_state[1].ele.duration;

			// curr_state[1].ele.play();
			// methods.swap();
			// setTimeout(() => {
			// 	update((state) => {
			// 		state[1].shouldAnim = true;
			// 		return state;
			// 	});
			// }, 5 * 1000);

			// if (duration - offset < 3) {
			// 	setTimeout(() => {
			// 		// console.log('test');
			// 		update((state) => {
			// 			state[1].shouldAnim = true;
			// 			return state;
			// 		});
			// 	}, (duration - offset) * 1000);
			// } else {
			// 	setTimeout(() => {
			// 		update((state) => {
			// 			state[0].shouldAnim = true;
			// 			return state;
			// 		});
			// 	}, (duration - offset) * 1000);
			// }
			// const eleToAnim = curr_state[0].ele;

			// });
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
