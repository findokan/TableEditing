const colorList = [
	{ description: "Metallic Dark Silver", hex: "#454b4f" },
	{ description: "Matte Dark Red", hex: "#732021" },
	{ description: "Metallic Sea Green", hex: "#12383c" },
	{ description: "Metallic Blue", hex: "#47578f" },
];

const randIntInterval = (minVal, maxVal) => {
	return Math.floor(Math.random() * (maxVal - minVal + 1) + minVal);
};

const generateCarId = (length) => {
	let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var result = "";
	for (var i = length; i > 0; --i)
		result += chars[Math.floor(Math.random() * chars.length)];
	return result;
};

const generateCarData = (id) => {
	return {
		id,
		carId: generateCarId(12),
		inStock: randIntInterval(0, 1) === 0 ? false : true,
		hp: randIntInterval(100, 550),
		price: randIntInterval(30000, 100000),
		currency: "€",
		color: colorList[randIntInterval(0, colorList.length - 1)],
	};
};

export { colorList, generateCarData };
