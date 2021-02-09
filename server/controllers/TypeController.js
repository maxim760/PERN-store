import { Type } from "../models/models.js";
import ApiError from "../error/ApiError.js";

import pkg from 'sequelize';
const { Op } = pkg;

class TypeController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const candidate = await Type.findOne({
        where: { name: { [Op.iLike]: `${name}` } },
      });
      if (candidate) {
        return next(ApiError.badRequest("Такой тип уже существует"));
      }
      const type = await Type.create({ name });
      return res.json(type);
    } catch (error) {
      return next(ApiError.internal(error.message));
    }
  }
  async getAll(req, res) {
    try {
      const types = await Type.findAll();
      return res.json(types);
    } catch (error) {
      ApiError.internal(error.message);
    }
  }
}

export default new TypeController();
