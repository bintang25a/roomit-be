import express from "express";
import {
   index,
   show,
   store,
   update,
   destroy,
} from "../controllers/UserController.js";

const router = express.Router();

router.get("/users", index);
router.get("/users/:id", show);
router.post("/users/", store);
router.patch("/users/:id", update);
router.delete("/users/:id", destroy);

export default router;
