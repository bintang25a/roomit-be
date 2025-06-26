import express from "express";
import {
   index,
   show,
   store,
   update,
   destroy,
} from "../controllers/RoomController.js";
import upload from "../middlewares/UploadRoomImage.js";
import { verifyUser, adminOnly } from "../middlewares/AuthUser.js";

const router = express.Router();

router.get("/rooms", index);
router.get("/rooms/:slug", show);
router.post("/rooms", verifyUser, adminOnly, upload.single("gambar"), store);
router.patch(
   "/rooms/:kode_ruangan",
   verifyUser,
   adminOnly,
   upload.single("gambar"),
   update
);
router.delete("/rooms/:kode_ruangan", verifyUser, adminOnly, destroy);

export default router;
