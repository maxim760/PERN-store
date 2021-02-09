import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import ApiError from "../error/ApiError.js";
import { User, Basket } from "../models/models.js";

const generateJWT = ({ email, role, id }) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password, role = "user" } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.failValidation(
            errors
              .array()
              .map((er) => er.msg)
              .join(", ")
          )
        );
      }
      const candidate = await User.findOne({
        where: { email },
      });
      if (candidate) {
        return next(
          ApiError.badRequest("Пользователь с таким email уже существует")
        );
      }
      const hashPassword = await bcrypt.hash(password, 7);
      const user = await User.create({ email, password: hashPassword, role });
      const basket = await Basket.create({ userId: user.id });
      const token = generateJWT({
        email: user.email,
        role: user.role,
        id: user.id,
      });
      return res.json({ token });
    } catch (error) {
      return next(ApiError.internal(error.message));
    }
  }
  async login(req, res, next) {
    const { email, password } = req.body;
    const candidate = await User.findOne({ where: { email } });
    if (!candidate) {
      return next(
        ApiError.badRequest("Пользователя с таким email не существует")
      );
    }
    if (!bcrypt.compareSync(password, candidate.password)) {
      return next(ApiError.badRequest("Неправильный логин или пароль"));
    }
    const token = generateJWT({
      email: candidate.email,
      id: candidate.id,
      role: candidate.role,
    });
    res.json({ token });
  }
  async check(req, res, next) {
    if (!req.user) {
      return next(ApiError.forbidden("Не авторизован"));
    }
    const { id, role, email } = req.user;
    const token = generateJWT({ id, role, email });

    res.json({token});
  }
}

export default new UserController();
