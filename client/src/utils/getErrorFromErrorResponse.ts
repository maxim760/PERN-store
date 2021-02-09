import { IResultError } from "../services/api/userApi";
type IErrorResponse = {
  status: number;
  data: {
    message: string;
  };
};

type IErrorFromErRes = {
  erResponse: IErrorResponse;
  messageEr?: string;
  statusEr?: number;
};

export const getErrorFromErrorResponse = ({
  erResponse,
  messageEr,
  statusEr,
}: IErrorFromErRes): IResultError => {
  const status: number = erResponse?.status || statusEr || 500;
  const message: string = erResponse?.data?.message || messageEr || "Ошибка";
  const error: IResultError = {
    status: "error",
    error: {
      status,
      message,
    },
  };
  return error;
};
