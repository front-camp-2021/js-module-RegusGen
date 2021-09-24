export const weirdString = (str = "") => {
	let result = "";
	let arr = str.split(" ");
	for (let i = 0; i < arr.length; i++) {
		let part_1 = "";
		let part_2 = "";
		part_1 = arr[i].slice(0, -1);
		part_2 = arr[i].slice(-1)
		result += (part_1.toUpperCase() + part_2.toLowerCase());
		if (i !== (arr.length - 1)) {
			result += " ";
		}
	}
	return result;
};
