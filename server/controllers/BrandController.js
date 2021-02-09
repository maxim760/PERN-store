import { Brand } from "../models/models.js";
import ApiError from "../error/ApiError.js";

import pkg from 'sequelize';
const { Op } = pkg;

class BrandController {

  async create(req, res, next) {
    try {
      const { name } = req.body;
      const candidate = await Brand.findOne({ where: { name: { [Op.iLike]: `${name}` } } });
      if (candidate) {
        return next(ApiError.badRequest("Такой бренд уже существует"));
      }
      const brand = await Brand.create({ name });
      return res.json(brand);
    } catch (error) {
      return next(ApiError.internal(error.message));
    }
  }
  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }
}

export default new BrandController();
