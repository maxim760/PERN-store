import jwt_decode from "jwt-decode"

export const getDataFromJwt = <T,>(token: string): T => {
  const decoded: T = jwt_decode(token)
  return decoded
}