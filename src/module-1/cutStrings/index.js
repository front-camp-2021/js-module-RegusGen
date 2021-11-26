export const cutStrings = (arr = []) => {
	const lenItem = [];
	for (let i = 0; i < arr.length; i++) {
		lenItem.push(arr[i].length);
	}
	let min = Math.min(...lenItem);
	const result = [];
	for (let j = 0; j < arr.length; j++) {
		result.push(arr[j].slice(0, min))
	}
	return result;
};



