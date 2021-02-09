import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import ApiError from "../error/ApiError.js";



const checkRoleMiddleware = (roles = []) => (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ").pop()
    if (!token) {
      return res.status(401).json({message: "Вы не авторизованы"})
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const userRole = decoded.role
    const isValidRole = roles.some(role => userRole === role)
    if (!isValidRole) {
      next(ApiError.forbidden("Нет прав на это действие"))
      return
    }
    req.user = decoded
    next()
  } catch (error) {
    next(ApiError.forbidden("Нет доступа"))
  }
}

export default checkRoleMiddleware