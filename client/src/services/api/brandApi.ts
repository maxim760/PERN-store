import { $host, $authHost } from "..";
import { getDataFromJwt } from "../../utils/getDataFromJwt";
import { IResultError } from "./userApi";
import { getErrorFromErrorResponse } from "../../utils/getErrorFromErrorResponse";
import { IBrand } from "../../store/ducks/brand/types";

type IBrandWithoutId = Omit<IBrand, "id">;

export const BrandApi = {
  async create(payload: IBrandWithoutId): Promise<IBrand | IResultError> {
    try {
      const { data } = await $authHost.post<IBrand>("brand", payload);
      return data;
    } catch (error) {
      const errorResult = getErrorFromErrorResponse({erResponse: error?.response,messageEr:"Ошибка"})
      return errorResult
    }
  },
  async getAll(): Promise<IBrand[] | IResultError> {
    try {
      const { data } = await $host.get<IBrand[]>("brand");
      return data;
    } catch (error) {
      const erResponse = error.response
      const errorResult = getErrorFromErrorResponse({erResponse,messageEr:"Ошибка при получении даннных"})
      return errorResult
    }
  },
};
