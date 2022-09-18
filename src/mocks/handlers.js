import { rest } from "msw";
import { colorList, generateCarData } from "./utils";

export const handlers = [
	rest.get("/get-car-data", (req, res, ctx) => {
		let tempCarData = [];

		for (let i = 0; i < 5; i++) {
			tempCarData.push(generateCarData(i + 1));
		}

		return res(ctx.delay(1500), ctx.status(200), ctx.json(tempCarData));
	}),
	rest.get("/get-color-list", (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(colorList));
	}),
];
