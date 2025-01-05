import { Sequelize, Dialect } from "sequelize";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// TODO: This should be external config
export let sequelize = new Sequelize("sqlite::memory:");

if (process.env.NODE_ENV !== "test") {
  sequelize = new Sequelize(
    process.env.DB_DATABASE ?? "MISSING_DB_NAME_CONFIG",

    process.env.DB_USER_NAME ?? "MISSING_DB_USERNAME_CONFIG",

    process.env.DB_PASSWORD ?? "MISSING_DB_PASSWORD_CONFIG",
    {
      host: process.env.DB_HOST ?? "MISSING_DB_HOST_CONFIG",
      port: parseInt(process.env.DB_PORT as string) ?? "MISSING_DB_PORT_CONFIG",
      dialect: (process.env.DB_DIALECT as Dialect) ?? "postgres",
    }
  );
}

export default sequelize;
