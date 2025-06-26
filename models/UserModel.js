import { DataTypes } from "sequelize";
import db from "../config/database.js";
import slugify from "slugify";

const User = db.define(
   "users",
   {
      uid: {
         type: DataTypes.STRING(16),
         allowNull: false,
         primaryKey: true,
      },
      nama: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      no_hp: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      role: {
         type: DataTypes.ENUM("mahasiswa", "dosen", "admin"),
         allowNull: false,
      },
      password: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      slug: {
         type: DataTypes.STRING,
         allowNull: true,
         unique: true,
      },
   },
   {
      freezeTableName: true,
      hooks: {
         beforeCreate: (user) => {
            user.slug = slugify(`${user.nama}-${Date.now()}`, { lower: true });
         },
         beforeUpdate: (user) => {
            if (user.changed("nama")) {
               user.slug = slugify(`${user.nama}-${Date.now()}`, {
                  lower: true,
               });
            }
         },
      },
   }
);

export default User;
