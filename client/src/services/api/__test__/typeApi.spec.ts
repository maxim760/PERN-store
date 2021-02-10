import { server } from "../../../forTest/server";
import { rest } from "msw";
import {  IResultError, isErrorType } from "../userApi";
import {
  TEST_ERROR,
  SUCCESS_TYPE_NAME,
  NON_SUCCESS_TYPE_NAME,
  TEST_SUCCESS_TYPES,
  TEST_SUCCESS_TYPES_ITEM,
} from "../../../forTest/consts";
import { IAuthError } from "../../../store/ducks/user/types";
import { TypeApi } from "../typeApi";
describe("type api test", () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());
  test("success getAll type", async () => {
    const result = await TypeApi.getAll();
    expect(result).toEqual(TEST_SUCCESS_TYPES);
  });
  test("fail getAll type", async () => {
    // server.use, чтобы изменить хэндлен
    server.use(
      rest.get(process.env.REACT_APP_API_URL + "type", (req, res, ctx) => {
        return res(ctx.status(500), ctx.json(TEST_ERROR));
      })
    );
    const result = await TypeApi.getAll() as IResultError

    expect(result.status).toBe("error")
  });
  test("success create type", async () => {
    const result = await TypeApi.create({ name: SUCCESS_TYPE_NAME });
    expect(result).toEqual(TEST_SUCCESS_TYPES_ITEM);
  });
  test("fail create type", async () => {
    // server.use, чтобы изменить хэндлен
    const result: IResultError = await TypeApi.create({ name: NON_SUCCESS_TYPE_NAME }) as IResultError;
    expect(result.status).toBe("error")
  });
});


test('test guard isErrorType', () => {
  expect(isErrorType({status: "error"})).toBeTruthy()
  expect(isErrorType({status: "error",info:"22"})).toBeTruthy()
  expect(isErrorType({status: "success"})).toBeFalsy()
  expect(isErrorType("error")).toBeFalsy()
  expect(isErrorType({error:true})).toBeFalsy()
})
