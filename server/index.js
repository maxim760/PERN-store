import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";

import sequelize from "./db.js";
import * as models from "./models/models.js";
import router from "./routes/index.js";
import ErrorHandler from "./middleware/ErrorHandlingMiddleware.js";
import path from "path"
import {fileURLToPath} from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));



const PORT = process.env.PORT || 5555;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload());
app.use("/api", router);

app.use(ErrorHandler); // мидлвар с ошибками должен регистрироваться в самом конце, после апи запроса

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
