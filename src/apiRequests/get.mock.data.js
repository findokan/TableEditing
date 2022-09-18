import axios from "axios";

const getCarData = async () => {
	return await axios.get("/get-car-data");
};

const getColorList = async () => {
	return await axios.get("/get-color-list");
};

export { getCarData, getColorList };
