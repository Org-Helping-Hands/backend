import "reflect-metadata";
import { createConnection } from "typeorm";

createConnection({
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_ACCESS_PORT as string),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "helpinghands",
  synchronize: true,
  logging: false,
  entities: ["src/models/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/models",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
});
