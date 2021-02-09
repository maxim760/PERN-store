import { v4 as getUniqueId } from "uuid";
import path from "path";
import { fileURLToPath } from "url";
import { Device, Type, Brand, DeviceInfo } from "../models/models.js";
import ApiError from "../error/ApiError.js";

import pkg from 'sequelize';
const { Op } = pkg;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      const candidate = await Device.findOne({ where: { name: { [Op.iLike]: `${name}` } } });
      if (candidate) {
        return next(ApiError.badRequest("Такой девайс уже существует"));
      }
      if (!brandId) {
        return next(ApiError.badRequest("Не указан бренд устройства"))
      }
      if (!typeId) {
        return next(ApiError.badRequest("Не указан тип устройства"))
      }
      let fileName = getUniqueId() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });
      if (info) {
        info = JSON.parse(info);
        console.log(info);
        info.forEach(({ title, description }) => {
          DeviceInfo.create({ title, description, deviceId: device.id });
        });
      }
      return res.json(device);
    } catch (error) {
      return next(ApiError.internal(error.message));
    }
  }
  async getAll(req, res, next) {
    try {
      const { typeId, brandId, limit = 9, page = 1 } = req.query;
      const offset = limit * (page - 1);
      let devices;
      if (!typeId && !brandId) {
        devices = await Device.findAndCountAll({
          include: [Type, Brand],
          limit,
          offset,
        });
      } else if (typeId && !brandId) {
        devices = await Device.findAndCountAll({
          where: { typeId },
          include: [Type, Brand],
          limit,
          offset,
        });
      } else if (!typeId && brandId) {
        devices = await Device.findAndCountAll({
          where: { brandId },
          include: [Type, Brand],
          limit,
          offset,
        });
      } else {
        devices = await Device.findAndCountAll({
          where: { brandId, typeId },
          include: [Type, Brand],
          limit,
          offset,
        });
      }
      console.log(devices);
      return res.json(devices);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }
  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        next(ApiError.forbidden("Нет доступа"));
        return;
      }
      if (Number.isNaN(+id)) {
        next(ApiError.badRequest("Девайса по такому адресу не существует"));
        return;
      }
      const device = await Device.findByPk(id, {
        include: [Type, Brand, { model: DeviceInfo, as: "info" }],
      });
      if (!device) {
        next(ApiError.badRequest("Девайса с таким id не существует"));
        return;
      }
      return res.json(device);
    } catch (error) {
      next(ApiError.internal(error.message));
    }
  }
}

export default new DeviceController();
