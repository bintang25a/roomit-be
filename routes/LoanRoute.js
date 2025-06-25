import express from "express";
import {
   index,
   show,
   store,
   update,
   destroy,
} from "../controllers/LoanController.js";

const router = express.Router();

router.get("/loans", index);
router.get("/loans/:id", show);
router.post("/loans/", store);
router.patch("/loans/:id", update);
router.delete("/loans/:id", destroy);

export default router;
