import db from "../config/database.js";
import User from "./UserModel.js";
import Room from "./RoomModel.js";
import Loan from "./LoanModel.js";

Loan.belongsTo(User, {
   foreignKey: "id_peminjam",
   targetKey: "uid",
});
Loan.belongsTo(Room, {
   foreignKey: "kode_ruangan",
   targetKey: "kode_ruangan",
});

User.hasMany(Loan, {
   foreignKey: "id_peminjam",
   sourceKey: "uid",
});

Room.hasMany(Loan, {
   foreignKey: "kode_ruangan",
   sourceKey: "kode_ruangan",
});

export { db, User, Room, Loan };
