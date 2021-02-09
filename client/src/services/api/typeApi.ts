import axios from "axios";
import { $host, $authHost } from "..";
import { getDataFromJwt } from "../../utils/getDataFromJwt";
import { IType } from "../../store/ducks/type/types";
import { IResultError } from "./userApi";
import { getErrorFromErrorResponse } from "../../utils/getErrorFromErrorResponse";

type ITypeWithoutId = Omit<IType, "id">;

export const TypeApi = {
  async create(payload: ITypeWithoutId): Promise<IType | IResultError> {
    try {
      const { data } = await $authHost.post<IType>("type", payload);
      return data;
    } catch (error) {
      const errorResult = getErrorFromErrorResponse({ erResponse: error?.response, messageEr: "Ошибка" })
      console.log(errorResult);
      
      return errorResult
    }
  },
  async getAll(): Promise<IType[] | IResultError> {
    try {
      const { data } = await $host.get<IType[]>("type");
      return data;
    } catch (error) {
      const erResponse = error.response
      const errorResult = getErrorFromErrorResponse({erResponse,messageEr:"Ошибка при получении даннных"})
      return errorResult
    }
  },
};
