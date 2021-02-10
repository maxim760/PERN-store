import { rest } from "msw";
import { TEST_SUCCESS_TYPES, SUCCESS_TYPE_NAME, TEST_SUCCESS_TYPES_ITEM, TEST_ERROR } from "../consts";

export const typeHandlers = [
  rest.get(process.env.REACT_APP_API_URL+"type", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(TEST_SUCCESS_TYPES));
  }),
  rest.post(process.env.REACT_APP_API_URL+"type", (req, res, ctx) => {
    const { name } = req.body as {name: string};
    if (name === SUCCESS_TYPE_NAME) {
      return res(ctx.status(200), ctx.json(TEST_SUCCESS_TYPES_ITEM))
    } else {
      return res(ctx.status(500), ctx.json(TEST_ERROR))
    }
  }),
];
