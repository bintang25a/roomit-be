import { DataTypes } from "sequelize";
import db from "../config/database.js";
import slugify from "slugify";

const Loan = db.define(
   "loans",
   {
      nomor_peminjaman: {
         type: DataTypes.STRING(24),
         allowNull: false,
         primaryKey: true,
      },
      kode_ruangan: {
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
      slug: {
         type: DataTypes.STRING,
         allowNull: true,
         unique: true,
      },
   },
   {
      freezeTableName: true,
      hooks: {
         beforeCreate: (loan) => {
            loan.slug = slugify(
               `${loan.kode_ruangan + loan.id_peminjam}-${Date.now()}`,
               {
                  lower: true,
               }
            );
         },
         beforeUpdate: (loan) => {
            if (loan.changed("kode_ruangan") || loan.changed("id_peminjam")) {
               loan.slug = slugify(
                  `${loan.kode_ruangan + loan.id_peminjam}-${Date.now()}`,
                  {
                     lower: true,
                  }
               );
            }
         },
      },
   }
);

export default Loan;
