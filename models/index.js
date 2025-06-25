import db from "../config/database.js";
import User from "./UserModel.js";
import Room from "./RoomModel.js";
import Loan from "./LoanModel.js";

// Definisikan relasi setelah semua model diimpor
Loan.belongsTo(User, {
  foreignKey: "id_peminjam",
  targetKey: "uid"
});
Loan.belongsTo(Room, {
  foreignKey: "id_ruangan",
  targetKey: "kode_ruangan"
});

User.hasMany(Loan, {
  foreignKey: "id_peminjam",
  sourceKey: "uid"
});

Room.hasMany(Loan, {
  foreignKey: "id_ruangan",
  sourceKey: "kode_ruangan"
});

// Export semua model
export { db, User, Room, Loan };
