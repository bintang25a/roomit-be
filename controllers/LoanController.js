import Loan from "../models/LoanModel.js";

export const index = async (req, res) => {
   try {
      const loan = await Loan.findAll();
      res.status(200).json(loan);
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Display all loans failed" });
   }
};

export const show = async (req, res) => {
   try {
      const loan = await Loan.findOne({
         where: {
            slug: req.params.slug,
         },
      });

      if (!loan) return res.status(404).json({ msg: "Loan not found" });

      res.status(200).json(loan);
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Display one loan failed" });
   }
};

export const store = async (req, res) => {
   const {
      nomor_peminjaman,
      kode_ruangan,
      id_peminjam,
      nama_pj,
      tanggal_pengajuan,
      tanggal_pemakaian,
      waktu_mulai,
      waktu_selesai,
      keperluan,
      progres,
   } = req.body;

   if (
      !nomor_peminjaman ||
      !kode_ruangan ||
      !id_peminjam ||
      !nama_pj ||
      !tanggal_pengajuan ||
      !tanggal_pemakaian ||
      !waktu_mulai ||
      !waktu_selesai ||
      !keperluan ||
      !progres
   ) {
      return res.status(400).json({ msg: "Field cannot empty" });
   }

   try {
      await Loan.create(req.body);
      res.status(201).json({ msg: "Create loan successfully" });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Create loan failed" });
   }
};

export const update = async (req, res) => {
   const loan = await Loan.findOne({
      where: {
         nomor_peminjaman: req.params.nomor_peminjaman,
      },
   });

   if (!loan) return res.status(404).json({ msg: "Loan not found" });

   try {
      await Loan.update(req.body, {
         where: {
            nomor_peminjaman: req.params.nomor_peminjaman,
         },
      });
      res.status(200).json({ msg: "Update loan successfully" });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Update loan failed" });
   }
};

export const destroy = async (req, res) => {
   const loan = await Loan.findOne({
      where: {
         nomor_peminjaman: req.params.nomor_peminjaman,
      },
   });

   if (!loan) return res.status(404).json({ msg: "Loan not found" });

   try {
      await Loan.destroy({
         where: {
            nomor_peminjaman: req.params.nomor_peminjaman,
         },
      });
      res.status(200).json({ msg: "Delete loan successfully" });
   } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Delete loan failed" });
   }
};
