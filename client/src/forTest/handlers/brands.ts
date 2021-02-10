import { rest } from "msw";
import { TEST_SUCCESS_BRANDS, TEST_SUCCESS_BRAND_ITEM, SUCCESS_BRAND_NAME, TEST_ERROR } from "../consts";

export const brandHandlers = [
  rest.get(process.env.REACT_APP_API_URL+"brand", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(TEST_SUCCESS_BRANDS));
  }),
  rest.post(process.env.REACT_APP_API_URL+"brand", (req, res, ctx) => {
    const { name } = req.body as {name: string};
    if (name === SUCCESS_BRAND_NAME) {
      return res(ctx.status(200), ctx.json(TEST_SUCCESS_BRAND_ITEM))
    } else {
      return res(ctx.status(500), ctx.json(TEST_ERROR))
    }
  }),
];
