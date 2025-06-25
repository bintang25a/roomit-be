import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Loan = db.define(
   "loans",
   {
      id_ruangan: {
         type: DataTypes.STRING(8),
         allowNull: false,
         references: {
            model: "rooms",
            key: "kode_ruangan",
         },
      },
      id_peminjam: {
         type: DataTypes.STRING(16),
         allowNull: false,
         references: {
            model: "users",
            key: "uid",
         },
      },
      tanggal_pengajuan: {
         type: DataTypes.DATE,
         allowNull: false,
      },
      tanggal_pemakaian: {
         type: DataTypes.DATE,
         allowNull: false,
      },
   },
   {
      freezeTableName: true,
   }
);

export default Loan;
