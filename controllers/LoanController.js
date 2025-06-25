import Loan from "../models/LoanModel.js";

export const index = async (req, res) => {
   try {
      const response = await Loan.findAll();
      res.status(200).json(response);
   } catch (error) {
      console.log(error.message);
   }
};

export const show = async (req, res) => {
   try {
      const response = await Loan.findOne({
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
      await Loan.create(req.body);
      res.status(201).json({ msg: "Loan add successfully" });
   } catch (error) {
      console.log(error.message);
   }
};

export const update = async (req, res) => {
   try {
      await Loan.update(req.body, {
         where: {
            id: req.params.id,
         },
      });
      res.status(200).json({ msg: "Loan edit successfully" });
   } catch (error) {
      console.log(error.message);
   }
};

export const destroy = async (req, res) => {
   try {
      await Loan.destroy({
         where: {
            id: req.params.id,
         },
      });
      res.status(200).json({ msg: "Loan delete successfully" });
   } catch (error) {
      console.log(error.message);
   }
};
