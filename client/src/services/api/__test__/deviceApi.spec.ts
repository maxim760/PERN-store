import { server } from "../../../forTest/server";
import { rest } from "msw";
import { UserApi, IResultError } from "../userApi";
import { DeviceApi } from "../deviceApi";
import {
  TEST_ERROR,
  SUCCESS_DEVICE_NAME,
  TEST_SUCCESS_DEVICES_ITEM,
  NON_SUCCESS_DEVICE_NAME,
  TEST_SUCCESS_DEVICES,
} from "../../../forTest/consts";
describe("device api test", () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());
  test("success getAll device", async () => {
    const result = await DeviceApi.getAll({});
    expect(result).toEqual(TEST_SUCCESS_DEVICES);
  });
  test("success getAll device with Params", async () => {
    server.use(
      rest.get(process.env.REACT_APP_API_URL + "device", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(TEST_SUCCESS_DEVICES));
      })
    );
    const result = await DeviceApi.getAll({limit:5,page:33});
    expect(result).toEqual(TEST_SUCCESS_DEVICES);
  });
  test("success getAll device with Params contains falsy values", async () => {
    server.use(
      rest.get(process.env.REACT_APP_API_URL + "device", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(TEST_SUCCESS_DEVICES));
      })
    );
    const result = await DeviceApi.getAll({limit:undefined,page:33});
    expect(result).toEqual(TEST_SUCCESS_DEVICES);
  });
  test("fail getAll device", async () => {
    // server.use, чтобы изменить хэндлен
    server.use(
      rest.get(process.env.REACT_APP_API_URL + "device", (req, res, ctx) => {
        return res(ctx.status(500), ctx.json(TEST_ERROR));
      })
    );
    const result = (await DeviceApi.getAll({})) as IResultError;

    expect(result.status).toBe("error");
  });
  test("success getOne device", async () => {
    const result = await DeviceApi.getOne(1);
    expect(result).toEqual(TEST_SUCCESS_DEVICES_ITEM);
  });
  test("fail getOne device", async () => {
    // server.use, чтобы изменить хэндлен
    server.use(
      rest.get(process.env.REACT_APP_API_URL + "device/:id", (req, res, ctx) => {
        return res(ctx.status(500), ctx.json(TEST_ERROR));
      })
    );
    const result = (await DeviceApi.getOne(1)) as IResultError;

    expect(result.status).toBe("error");
  });
  test("success create device", async () => {
    const result = await DeviceApi.create(({
      name: SUCCESS_DEVICE_NAME,
    } as unknown) as FormData);
    expect(result).toEqual(TEST_SUCCESS_DEVICES_ITEM);
  });
  test("fail create device", async () => {
    const result: IResultError = (await DeviceApi.create(({
      name: NON_SUCCESS_DEVICE_NAME,
    } as unknown) as FormData)) as IResultError;
    expect(result.status).toBe("error");
  });
});
