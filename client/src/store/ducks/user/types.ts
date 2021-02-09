import { ILoadingStatus } from "../types"
import { IError } from "../../../services/api/userApi"

export type IUser = {
  id: number,
  email: string,
  role: string,
}
export type IAuthError = null | IError | string
export type IUserState = {
  isAuth: boolean,
  user: null | IUser,
  authStatus: ILoadingStatus,
  authError: IAuthError
}
