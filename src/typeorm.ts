import "reflect-metadata";
import { createConnection } from "typeorm";
createConnection({
  type: "mysql",
  host: "mysql-service",
  port: 3306,
  username: "Om",
  password: "0000",
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
