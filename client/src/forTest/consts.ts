import { IDeviceWithCount } from "../services/api/deviceApi";
import { IBrand } from "../store/ducks/pages/types";
import { IType } from "../store/ducks/type/types";

// https://www.jsonwebtoken.io
export const TEST_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3RAbWFpbC5ydSIsImlkIjoxLCJyb2xlIjoiVVNFUiIsImp0aSI6IjM0ODEyYmM1LWQ3MmEtNDJjMC05NmNhLTQ4NTNlYWQyNGIwNSIsImlhdCI6MTYxMjk2NjQ3MiwiZXhwIjoxNjEyOTcwMDcyfQ.9FFrDqaC-qr-Z3SCAn5OOELgXsM_x9xQElyG6h5c108";

export const TEST_DATA_FROM_TOKEN = {
  id: 1,
  email: "test@mail.ru",
  role: "USER",
};

export const TEST_SUCCESS_TYPES: IType[] = [
  { id: 1, name: "Ноутбуки" },
  { id: 2, name: "Наушники" },
  { id: 3, name: "Холодильники" },
];
export const TEST_SUCCESS_TYPES_ITEM: IType = { id: 1, name: "Ноутбуки" };
export const TEST_SUCCESS_BRANDS: IBrand[] = [
  { id: 1, name: "Samsung" },
  { id: 2, name: "Apple" },
  { id: 3, name: "Asus" },
];
export const TEST_SUCCESS_BRAND_ITEM: IType = { id: 1, name: "Samsung" };
export const TEST_SUCCESS_DEVICES: IDeviceWithCount = {
  count: 3,
  rows: [
    {
      id: 1,
      name: "название",
      price: 4999,
      rating: 3,
      img: "url",
      info: [{ id: 1, title: "вес", description: "5kg" }],
    },
    {
      id: 2,
      name: "iphone 5",
      price: 14999,
      rating: 4,
      img: "url",
      info: [{ id: 1, title: "вес", description: "5kg" }],
    },
    {
      id: 3,
      name: "galaxy s6",
      price: 24999,
      rating: 5,
      img: "url",
      info: [{ id: 1, title: "камера", description: "5mp" }],
    },
  ],
};

export const TEST_SUCCESS_DEVICES_ITEM = {
  id: 3,
  name: "galaxy s6",
  price: 24999,
  rating: 5,
  img: "url",
  info: [{ id: 1, title: "камера", description: "5mp" }],
};

export const SUCCESS_TYPE_NAME = "success_stype";
export const NON_SUCCESS_TYPE_NAME = "unsuccess_stype";
export const SUCCESS_BRAND_NAME = "succes_brand";
export const NON_SUCCESS_BRAND_NAME = "nonesucces_brand";
export const SUCCESS_DEVICE_NAME = "succes_device";
export const NON_SUCCESS_DEVICE_NAME = "nonesucces_device";

export const TEST_ERROR = { error: "ошибка" };
