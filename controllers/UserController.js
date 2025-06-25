import User from "../models/UserModel.js";

export const index = async (req, res) => {
   try {
      const response = await User.findAll();
      res.status(200).json(response);
   } catch (error) {
      console.log(error.message);
   }
};

export const show = async (req, res) => {
   try {
      const response = await User.findOne({
         where: {
            id: req.params.id,
         },
      });
      res.status(200).json(response);
   } catch (error) {
      console.log(error.message);
   }
};

export const store = async (req, res) => {
   try {
      await User.create(req.body);
      res.status(201).json({ msg: "User add successfully" });
   } catch (error) {
      console.log(error.message);
   }
};

export const update = async (req, res) => {
   try {
      await User.update(req.body, {
         where: {
            id: req.params.id,
         },
      });
      res.status(200).json({ msg: "User edit successfully" });
   } catch (error) {
      console.log(error.message);
   }
};

export const destroy = async (req, res) => {
   try {
      await User.destroy({
         where: {
            id: req.params.id,
         },
      });
      res.status(200).json({ msg: "User delete successfully" });
   } catch (error) {
      console.log(error.message);
   }
};
