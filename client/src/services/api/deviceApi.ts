import axios from "axios";
import { $host, $authHost } from "..";
import { getDataFromJwt } from "../../utils/getDataFromJwt";
import { IDevice } from "../../store/ducks/device/types";
import { getErrorFromErrorResponse } from "../../utils/getErrorFromErrorResponse";
import { IResultError, IResult } from "./userApi";

type IDeviceForCreate = Omit<IDevice, "id">;
type IDeviceForGetAll = {
  typeId?: number;
  brandId?: number;
  limit?: number;
  page?: number;
};
export type IDeviceWithCount = {
  count: number,
  rows: IDevice[]
}

export const DeviceApi = {
  async create(payload: FormData): Promise<IResultError | IDevice> {
    try {
      const { data } = await $authHost.post<IDevice>("device", payload);
      return data;
    } catch (error) {
      const errorResult = getErrorFromErrorResponse({
        erResponse: error?.response,
        messageEr: "Ошибка при создании нового устройства",
      });
      return errorResult;
    }
  },
  async getOne(id: number): Promise<IResultError | IDevice> {
    try {
      const { data } = await $host.get<IDevice>(`device/${id}`);
      return data;
    } catch (error) {
      const errorResult = getErrorFromErrorResponse({
        erResponse: error?.response,
        messageEr: "Устройство по заданному id не найдено",
      });
      return errorResult;
    }
  },
  async getAll(params: IDeviceForGetAll): Promise<IResultError | IDeviceWithCount> {
    try {
      const query = Object.entries(params)
        .reduce((acc: string[], [key, value]) => {
          if (value) {
            acc.push(`${key}=${value}`);
          }
          return acc;
        }, [])
        .join("&");
      console.log(query)
      const data  = await $host.get<IDeviceWithCount>(`device`, {params});
      return data.data;
    } catch (error) {
      const errorResult = getErrorFromErrorResponse({
        erResponse: error?.response,
        messageEr: "Не удалось получить устройства",
      });
      return errorResult;
    }
  },
};
