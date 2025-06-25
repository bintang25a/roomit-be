import express from "express";
import {
   index,
   show,
   store,
   update,
   destroy,
} from "../controllers/RoomController.js";

const router = express.Router();

router.get("/rooms", index);
router.get("/rooms/:id", show);
router.post("/rooms/", store);
router.patch("/rooms/:id", update);
router.delete("/rooms/:id", destroy);

export default router;
