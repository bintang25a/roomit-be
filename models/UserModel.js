import { DataTypes, Sequelize } from "sequelize";
import db from "../config/database.js";

const User = db.define(
   "users",
   {
      user_id: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      phone_number: { type: DataTypes.STRING, allowNull: false },
      status: {
         type: DataTypes.ENUM("mahasiswa", "dosen", "admin"),
         allowNull: false,
      },
   },
   {
      freezeTableName: true,
   }
);

export default User;

(async () => {
   await db.sync();
})();
