import { DataTypes } from "sequelize";
import db from "../config/database.js";
import slugify from "slugify";

const Room = db.define(
   "rooms",
   {
      kode_ruangan: {
         type: DataTypes.STRING(8),
         allowNull: false,
         primaryKey: true,
      },
      nama: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      kapasitas: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      gedung: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      ketersediaan: {
         type: DataTypes.BOOLEAN,
         defaultValue: true,
         allowNull: false,
      },
      gambar: {
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
         beforeCreate: (room) => {
            room.slug = slugify(`${room.nama}-${Date.now()}`, { lower: true });
         },
         beforeUpdate: (room) => {
            if (room.changed("nama")) {
               room.slug = slugify(`${room.nama}-${Date.now()}`, {
                  lower: true,
               });
            }
         },
      },
   }
);

export default Room;
