import { Sequelize } from "sequelize";
import { config } from "./config";

export const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    port: Number(config.db.port),
    dialect: 'postgres',
    logging: true,
  }
);