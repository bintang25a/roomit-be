import { DataTypes } from "sequelize";
import db from "../config/database.js";

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
   },
   {
      freezeTableName: true,
   }
);

export default Room;
