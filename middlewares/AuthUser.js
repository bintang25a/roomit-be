import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
   if (!req.session.uid) {
      return res.status(401).json({ msg: "Please login!" });
   }

   const user = await User.findOne({
      where: {
         uid: req.session.uid,
      },
   });

   if (!user) return res.status(404).json({ msg: "User not found!" });

   req.uid = user.uid;
   req.role = user.role;
   next();
};

export const adminOnly = async (req, res, next) => {
   const user = await User.findOne({
      where: {
         uid: req.session.uid,
      },
   });

   if (!user) return res.status(404).json({ msg: "User not found!" });
   if (user.role !== "admin")
      return res.status(403).json({ msg: "Not allowed!" });
   next();
};
