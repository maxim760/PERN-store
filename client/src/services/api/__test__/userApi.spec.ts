import { server } from "../../../forTest/server";
import { rest } from "msw";
import { IResultError } from "../userApi";
import {
  TEST_ERROR,

  TEST_DATA_FROM_TOKEN,
  TEST_TOKEN,
} from "../../../forTest/consts";
import { UserApi } from "../userApi";
import { IUser } from "../../../store/ducks/user/types";

const USER_LOGIN = { email: "123", password: "3213" };
const USER_REGISTER = { ...USER_LOGIN, role: "role" };
describe("user api test", () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());
  test("success login user", async () => {
    const result = await UserApi.login(USER_LOGIN);
    expect(result).toEqual({token:TEST_TOKEN, status:"success"});
  });
  test("fail login user", async () => {
    // server.use, чтобы изменить хэндлен
    server.use(
      rest.post(
        process.env.REACT_APP_API_URL + "user/login",
        (req, res, ctx) => {
          return res(ctx.status(500), ctx.json(TEST_ERROR));
        }
      )
    );
    const result = (await UserApi.login(USER_LOGIN)) as IResultError;

    expect(result.status).toBe("error");
  });
  test("success registration user", async () => {
    const result = await UserApi.registration(USER_REGISTER);
    expect(result).toEqual({token:TEST_TOKEN, status:"success"});
  });
  test("fail registration user", async () => {
    server.use(
      rest.post(
        process.env.REACT_APP_API_URL + "user/registration",
        (req, res, ctx) => {
          return res(ctx.status(500), ctx.json(TEST_ERROR));
        }
      )
    );
    const result: IResultError = (await UserApi.registration(
      USER_REGISTER
    )) as IResultError;
    expect(result.status).toBe("error");
  });
  test("success check user", async () => {
    const result = await UserApi.check() as IUser;
    expect(result.email).toEqual(TEST_DATA_FROM_TOKEN.email);
    expect(result.id).toEqual(TEST_DATA_FROM_TOKEN.id);
    expect(result.role).toEqual(TEST_DATA_FROM_TOKEN.role);
  });
  test("success check user but not return token", async () => {
    server.use(
      rest.get(process.env.REACT_APP_API_URL + "user/auth", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({status:"success"})); // токена нет
      })
    );
    const result = await UserApi.check() as IUser;
    expect(result).toBeFalsy();
  });
  test("fail check user", async () => {
    server.use(
      rest.get(process.env.REACT_APP_API_URL + "user/auth", (req, res, ctx) => {
        return res(ctx.status(500), ctx.json(TEST_ERROR));
      })
    );
    const result = await UserApi.check();
    expect(result).toBeFalsy();
  });
});
