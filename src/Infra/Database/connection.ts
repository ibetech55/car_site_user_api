import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "../../Entities/user";
import '../../Configs/Enviroment'
import { Addresses } from "../../Entities/address";
import { DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME, DATABASE_HOST } from "../../Configs/Enviroment/EnviromentVariables";
import { Dealersrhips } from "../../Entities/dealership";
import { PrivateUsers } from "../../Entities/privateUser";
import { Access } from "../../Entities/access";
const AppDataSource = new DataSource({
  type: "postgres",
  port: DATABASE_PORT,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  host: DATABASE_HOST,
  synchronize: false,
  logging: false,
  entities: [Users, Addresses, Dealersrhips, PrivateUsers, Access],
  migrations: [`${__dirname}/**/Migrations/*.{ts,js}`],
  ssl:{
    rejectUnauthorized: false
  }
});
export { AppDataSource };
