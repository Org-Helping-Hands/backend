import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("helpinghands", "om", "1", {
  host: "localhost",
  dialect: "mysql",
});