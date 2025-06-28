import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
   const user = await User.findOne({
      where: {
         uid: req.body.uid,
      },
   });

   if (!user) return res.status(404).json({ msg: "User not found!" });
   if (req.body.password === "")
      return res.status(400).json({ msg: "Field cannot empty!" });
   const match = await bcrypt.compare(req.body.password, user.password);
   if (!match) return res.status(400).json({ msg: "Wrong password!" });

   req.session.uid = user.uid;
   const uid = user.uid;
   const nama = user.nama;
   const no_hp = user.no_hp;
   const email = user.email;
   const role = user.role;
   res.status(200).json({ uid, nama, no_hp, email, role });
};

export const Me = async (req, res) => {
   try {
      if (!req.session.uid) {
         return res.status(401).json({ msg: "Please login!" });
      }

      const uid = String(req.session.uid).trim();
      const user = await User.findOne({
         where: {
            uid,
         },
         attributes: ["uid", "nama", "no_hp", "email", "role", "slug"],
      });

      if (!user) return res.status(404).json({ msg: "User not found!" });

      return res.status(200).json(user);
   } catch (error) {
      console.log(error);
   }
};

export const logout = async (req, res) => {
   req.session.destroy((err) => {
      if (err) return res.status(400).json({ msg: "Logout failed!" });
      return res.status(200).json({ msg: "Logout successfully!" });
   });
};
