export const cutStrings = (arr = []) => {
	let min = Infinity;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].length < min) {
			min = arr[i].length;
		}
	}
	const result = [];
	for (let j = 0; j < arr.length; j++) {
		result.push(arr[j].slice(0, min))
	}
	return result;
};



