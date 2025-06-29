import Room from "../models/RoomModel.js";
import fs from "fs";
import path from "path";
import Loan from "../models/LoanModel.js";

export const index = async (req, res) => {
   try {
      const room = await Room.findAll({
         include: [
            {
               model: Loan,
            },
         ],
      });
      res.status(200).json(room);
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Display all rooms failed" });
   }
};

export const show = async (req, res) => {
   try {
      const room = await Room.findOne({
         where: {
            slug: req.params.slug,
         },
         include: [
            {
               model: Loan,
            },
         ],
      });

      if (!room) return res.status(404).json({ msg: "Room not found" });

      res.status(200).json(room);
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Display one room failed" });
   }
};

export const store = async (req, res) => {
   const { kode_ruangan, nama, kapasitas, gedung } = req.body;

   if (!kode_ruangan || !nama || !kapasitas || !gedung) {
      return res.status(400).json({ msg: "Field cannot empty" });
   }

   const gambar = req.file ? `rooms/images/${req.file.filename}` : null;

   try {
      await Room.create({
         kode_ruangan,
         nama,
         kapasitas,
         gedung,
         gambar,
      });

      res.status(201).json({ msg: "Create room successfully" });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Create room failed" });
   }
};

export const update = async (req, res) => {
   const { kode_ruangan, nama, kapasitas, gedung, ketersediaan } = req.body;

   const room = await Room.findOne({
      where: {
         kode_ruangan: req.params.kode_ruangan,
      },
   });

   if (!room) return res.status(404).json({ msg: "Room not found" });

   try {
      let gambar = room.gambar;
      if (req.file) {
         gambar = `rooms/images/${req.file.filename}`;

         if (room.gambar) {
            const oldFilePath = path.join(
               "uploads",
               path.basename(room.gambar)
            );
            if (fs.existsSync(oldFilePath)) {
               fs.unlinkSync(oldFilePath);
            }
         }
      }

      await Room.update(
         {
            kode_ruangan,
            nama,
            kapasitas,
            gedung,
            gambar,
            ketersediaan,
         },
         {
            where: {
               kode_ruangan: req.params.kode_ruangan,
            },
         }
      );

      res.status(200).json({ msg: "Update room successfully" });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Update room failed" });
   }
};

export const destroy = async (req, res) => {
   const room = await Room.findOne({
      where: {
         kode_ruangan: req.params.kode_ruangan,
      },
   });

   if (!room) return res.status(404).json({ msg: "Room not found" });

   try {
      const gambar = room.gambar;
      if (gambar) {
         const oldImagePath = path.join("uploads", path.basename(gambar));
         if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
         }
      }

      await Room.destroy({
         where: {
            kode_ruangan: req.params.kode_ruangan,
         },
      });

      res.status(200).json({ msg: "Delete room successfully" });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Delete room failed" });
   }
};
