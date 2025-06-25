import express from "express";
import {
   index,
   show,
   store,
   update,
   destroy,
} from "../controllers/RoomController.js";
import upload from "../middlewares/uploadRoomImage.js";

const router = express.Router();

router.get("/rooms", index);
router.get("/rooms/:id", show);
router.post("/rooms", upload.single("gambar"), store);
router.patch("/rooms/:id", update);
router.delete("/rooms/:id", destroy);

export default router;
