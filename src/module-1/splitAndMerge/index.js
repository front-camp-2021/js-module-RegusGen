export const splitAndMerge = (str = "", separator = "") => {
	const arr = str.split("");
	let result = "";
	for (let i = 0; i < (arr.length - 1); i++) {
		if (arr[i] !== " " && arr[i+1] !== " ") {
			arr[i] += separator;
		}
	}
	result = arr.join("");
	return result;
};
