// this action will check if the element is intersecting and if it is, it will add the animation class to the element
// i dont want to use component because for some reason you cant access the node in the component

function is_intersecting(node, cb) {
	//this function will check if the element is intersecting
	//if it is, then it will return true
	//if not, then it will return false
	const observer = new IntersectionObserver((entries) => {
		const intersecting = entries[0].isIntersecting;

		if (intersecting) {
			node.dispatchEvent(new CustomEvent('intersect'));
			cb();

			observer.disconnect();
		}
	});
	observer.observe(node);
	return observer;
}

export function getAnim(node, anim) {
	//this function also has to check if the element is intersecting
	//if it is, then it should add the animation class to the element

	const observer = is_intersecting(node, () => {
		node.classList.add(anim);
	});

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
