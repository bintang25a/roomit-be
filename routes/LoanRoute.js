import express from "express";
import {
   index,
   show,
   store,
   update,
   destroy,
} from "../controllers/LoanController.js";
import { verifyUser, adminOnly } from "../middlewares/AuthUser.js";

const router = express.Router();

router.get("/loans", verifyUser, adminOnly, index);
router.get("/loans/:slug", verifyUser, adminOnly, show);
router.post("/loans/", verifyUser, adminOnly, store);
router.patch("/loans/:nomor_peminjaman", verifyUser, adminOnly, update);
router.delete("/loans/:nomor_peminjaman", verifyUser, adminOnly, destroy);

export default router;
