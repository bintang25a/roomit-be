import { Sequelize } from "sequelize";

const db_dialect = "mysql";
const db_host = "localhost";
const db_name = "db_roomit";
const db_user = "root";
const db_password = "";

const db = new Sequelize(db_name, db_user, db_password, {
   host: db_host,
   dialect: db_dialect,
});

export default db;
