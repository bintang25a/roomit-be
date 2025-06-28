import User from "../models/UserModel.js";
import Loan from "../models/LoanModel.js";
import Room from "../models/RoomModel.js";
import bcrypt from "bcrypt";

export const index = async (req, res) => {
   try {
      const user = await User.findAll({
         attributes: {
            exclude: ["password"],
         },
         include: [
            {
               model: Loan,
               include: [
                  {
                     model: Room,
                     attributes: ["nama", "kapasitas"],
                  },
               ],
            },
         ],
      });
      res.status(200).json(user);
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Display all users failed" });
   }
};

export const show = async (req, res) => {
   try {
      const user = await User.findOne({
         where: {
            slug: req.params.slug,
         },
         attributes: {
            exclude: ["password"],
         },
         include: [
            {
               model: Loan,
               include: [
                  {
                     model: Room,
                     attributes: ["nama"],
                  },
               ],
            },
         ],
      });

      if (!user) return res.status(404).json({ msg: "User not found" });

      res.status(200).json(user);
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Display one user failed" });
   }
};

export const store = async (req, res) => {
   const { uid, nama, no_hp, email, role, password } = req.body;

   if (!uid || !nama || !no_hp || !email || !role || !password) {
      return res.status(400).json({ msg: "Field cannot empty" });
   }

   const hashPassword = await bcrypt.hash(password, 10);

   try {
      await User.create({
         uid,
         nama,
         no_hp,
         email,
         role,
         password: hashPassword,
      });
      res.status(201).json({ msg: "Create user successfully" });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Create user failed" });
   }
};

export const update = async (req, res) => {
   const { uid, nama, no_hp, email, role, password } = req.body;

   const user = await User.findOne({
      where: {
         slug: req.params.slug,
      },
   });

   if (!user) return res.status(404).json({ msg: "User not found" });

   let hashPassword;
   if (!password) {
      hashPassword = user.password;
   } else {
      hashPassword = await bcrypt.hash(password, 10);
   }

   try {
      await user.update(
         {
            uid,
            nama,
            no_hp,
            email,
            role,
            password: hashPassword,
         },
         {
            where: {
               slug: req.params.slug,
            },
         }
      );
      res.status(200).json({ msg: "Update user successfully" });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Update user failed" });
   }
};

export const destroy = async (req, res) => {
   const user = await User.findOne({
      where: {
         uid: req.params.uid,
      },
   });

   if (!user) return res.status(404).json({ msg: "User not found" });

   try {
      await User.destroy({
         where: {
            uid: req.params.uid,
         },
      });
      res.status(200).json({ msg: "Delete user successfully" });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Delete user failed" });
   }
};
