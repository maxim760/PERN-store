import { selectUserIsAuth } from "../store/ducks/user/selector"
import { setIsAuth, setNotIsAuth } from "../store/ducks/user/slice"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../store/store"

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const isAuth = useSelector(selectUserIsAuth);
  const handleSetAuthTrue = () => dispatch(setIsAuth())
  const handleSetAuthFalse = () => dispatch(setNotIsAuth())
  return {
    isAuth,
    handleSetAuthFalse,
    handleSetAuthTrue,
  }
}