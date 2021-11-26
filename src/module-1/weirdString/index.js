export const weirdString = (str = "") => {
	const result = [];
	const arr = str.split(" ");
	for (let i = 0; i < arr.length; i++) {
		const part_1 = arr[i].slice(0, -1);
		const part_2 = arr[i].slice(-1)
		result.push(part_1.toUpperCase() + part_2.toLowerCase());
	}
	return result.join(' ');
};
