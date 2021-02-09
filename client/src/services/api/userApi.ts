import axios from "axios";
import { IUser } from "../../store/ducks/user/types";
import { $host, $authHost } from "..";
import { getDataFromJwt } from "../../utils/getDataFromJwt";
import { getErrorFromErrorResponse } from "../../utils/getErrorFromErrorResponse";

export type IUserForRegister = {
  email: string;
  password: string;
  role?: string;
};
export type IUserForLogin = Omit<IUserForRegister, "role">;

export type IResult = {
  status: "success";
  token: string;
};
export type IError = {
  status: number;
  message: string;
};
export interface IResultError {
  status: "error";
  error: IError;
};

export function isErrorType(arg: any): arg is IResultError {
  return arg?.status === "error"
}

type IToken = {
  token: string;
};

export const UserApi = {
  async login(payload: IUserForLogin): Promise<IResultError | IResult> {
    try {
      const data = await $host.post<IToken>(`user/login`, payload);
      console.log(data);
      const token = data.data.token;
      const result: IResult = {
        status: "success",
        token,
      };
      return result;
    } catch (error) {
      const errorResult = getErrorFromErrorResponse({
        erResponse: error.response,
        messageEr: "Неправильный логин или пароль",
      });
      return errorResult;
    }
  },
  async registration(
    payload: IUserForRegister
  ): Promise<IResultError | IResult> {
    try {
      const data = await $host.post<IToken>(`user/registration`, {
        ...payload,
        role: "ADMIN",
      });
      const token = data.data.token;
      const result: IResult = {
        status: "success",
        token,
      };
      return result;
    } catch (error) {
      const errorResult = getErrorFromErrorResponse({
        erResponse: error.response,
        messageEr: "Ошибка при регистрации",
      });
      return errorResult;
    }
  },
  async check(): Promise<IUser | false> {
    try {
      const data = await $authHost.get<IToken>(`user/auth`);
      const token = data.data.token;
      window.localStorage.setItem("token", token);
      if (token) {
        return getDataFromJwt<IUser>(token);
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  },
};
