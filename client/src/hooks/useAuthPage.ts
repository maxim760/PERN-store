import { useState } from "react"
import { useLocation } from "react-router-dom"
import { ROUTES } from "../utils/consts"
import { useChange } from "./useChange"

export const useAuthPage = () => {
  const [password, handleChangePassword] = useChange()
  const [email, handleChangeEmail] = useChange()


  return {
    password,
    email,
    handleChangeEmail, handleChangePassword
  }
}