import { rest } from "msw";
import { TEST_TOKEN } from "../consts";

export const userHandlers = [
  rest.get(process.env.REACT_APP_API_URL + "user/login", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ token: TEST_TOKEN }));
  }),
  rest.get(
    process.env.REACT_APP_API_URL + "user/registration",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ token: TEST_TOKEN }));
    }
  ),
  rest.get(process.env.REACT_APP_API_URL + "user/auth", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ token: TEST_TOKEN }));
  }),
];
