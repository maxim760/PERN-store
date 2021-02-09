import { RootState } from "../../RootReducer";
import { ILoadingStatus } from "../types";

export const selectUserIsAuth = (state: RootState): boolean => state.user.isAuth
export const selectUser = (state: RootState) => state.user.user
export const selectUserAuthStatusMiddle = (state: RootState) => state.user.authStatus
export const selectUserAuthStatus = (state: RootState) => {
  const status = selectUserAuthStatusMiddle(state)
  return {
    isLoading: status === ILoadingStatus.LOADING,
    isError: status === ILoadingStatus.ERROR,
    isNever: status === ILoadingStatus.NEVER,
    isSuccess: status === ILoadingStatus.SUCCESS,
  }
}
export const selectUserAuthError = (state: RootState) => state.user.authError
export const selectUserIsAdmin = (state: RootState) => selectUser(state)?.role === "ADMIN"