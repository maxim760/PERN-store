import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken"

export default function (req, res, next) {
  if (req.method === "OPTIONS") {
    return next()
  }
  try {
    const token = req.headers.authorization.split(" ").pop()
    if (!token) {
      return res.status(401).json({message: "Вы не автризованы"})
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({message: "Вы не автризованы"})
  }
}