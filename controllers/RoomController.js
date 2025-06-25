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
      const { kode_ruangan, nama, kapasitas, gedung } = req.body;

      const gambar = req.file ? req.file.path : null;

      await Room.create({
         kode_ruangan,
         nama,
         kapasitas,
         gedung,
         gambar,
      });

      res.status(201).json({ msg: "Room added successfully" });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Error creating room" });
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
