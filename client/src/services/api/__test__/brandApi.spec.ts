import { server } from "../../../forTest/server";
import { rest } from "msw";
import { UserApi, IResultError } from "../userApi";
import { BrandApi } from "../brandApi";
import {
  TEST_ERROR,
  SUCCESS_BRAND_NAME,
  TEST_SUCCESS_BRAND_ITEM,
  NON_SUCCESS_BRAND_NAME,
  TEST_SUCCESS_BRANDS,
} from "../../../forTest/consts";
import { IAuthError } from "../../../store/ducks/user/types";
describe("brand api test", () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());
  test("success getAll", async () => {
    const result = await BrandApi.getAll();
    expect(result).toEqual(TEST_SUCCESS_BRANDS);
  });
  test("fail getAll", async () => {
    // server.use, чтобы изменить хэндлен
    server.use(
      rest.get(process.env.REACT_APP_API_URL + "brand", (req, res, ctx) => {
        return res(ctx.status(500), ctx.json(TEST_ERROR));
      })
    );
    const result = await BrandApi.getAll() as IResultError

    expect(result.status).toBe("error")
  });
  test("success create", async () => {
    const result = await BrandApi.create({ name: SUCCESS_BRAND_NAME });
    expect(result).toEqual(TEST_SUCCESS_BRAND_ITEM);
  });
  test("fail create", async () => {
    // server.use, чтобы изменить хэндлен
    const result: IResultError = await BrandApi.create({ name: NON_SUCCESS_BRAND_NAME }) as IResultError;
    expect(result.status).toBe("error")
  });
});
