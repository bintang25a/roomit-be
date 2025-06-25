import Room from "../models/RoomModel.js";

export const index = async (req, res) => {
   try {
      const response = await Room.findAll();
      res.status(200).json(response);
   } catch (error) {
      console.log(error.message);
   }
};

export const show = async (req, res) => {
   try {
      const response = await Room.findOne({
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
      await Room.create(req.body);
      res.status(201).json({ msg: "Room add successfully" });
   } catch (error) {
      console.log(error.message);
   }
};

export const update = async (req, res) => {
   try {
      await Room.update(req.body, {
         where: {
            id: req.params.id,
         },
      });
      res.status(200).json({ msg: "Room edit successfully" });
   } catch (error) {
      console.log(error.message);
   }
};

export const destroy = async (req, res) => {
   try {
      await Room.destroy({
         where: {
            id: req.params.id,
         },
      });
      res.status(200).json({ msg: "Room delete successfully" });
   } catch (error) {
      console.log(error.message);
   }
};
