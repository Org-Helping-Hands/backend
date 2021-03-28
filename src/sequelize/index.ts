import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("helpinghands", "om", "12345", {
  host: "localhost",
  dialect: "mysql",
});
