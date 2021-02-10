import { rest } from "msw";
import { TEST_SUCCESS_DEVICES, TEST_SUCCESS_DEVICES_ITEM, SUCCESS_DEVICE_NAME, TEST_ERROR } from "../consts";

export const deviceHandlers = [
  rest.get(process.env.REACT_APP_API_URL+"device", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(TEST_SUCCESS_DEVICES));
  }),
  rest.get(process.env.REACT_APP_API_URL+"device/:id", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(TEST_SUCCESS_DEVICES_ITEM));
  }),
  rest.post(process.env.REACT_APP_API_URL+"device", (req, res, ctx) => {
    const { name } = req.body as {name: string};
    if (name === SUCCESS_DEVICE_NAME) {
      return res(ctx.status(200), ctx.json(TEST_SUCCESS_DEVICES_ITEM))
    } else {
      return res(ctx.status(500), ctx.json(TEST_ERROR))
    }
  }),
];