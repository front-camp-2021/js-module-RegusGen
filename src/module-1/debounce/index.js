export const debounce = (fn, delay = 0) => {
	let isCool = false;
	return function () {
		if (isCool) return;
		let result = fn.apply(this, arguments);
		isCool = true;
		setTimeout(() => isCool = false, delay);
		return result;
	};
}


