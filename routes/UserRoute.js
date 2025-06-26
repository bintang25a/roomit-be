import express from "express";
import {
   index,
   show,
   store,
   update,
   destroy,
} from "../controllers/UserController.js";
import { verifyUser, adminOnly } from "../middlewares/AuthUser.js";

const router = express.Router();

router.get("/users", verifyUser, index);
router.get("/users/:slug", verifyUser, show);
router.post("/users/", store);
router.patch("/users/:slug", verifyUser, update);
router.delete("/users/:uid", verifyUser, adminOnly, destroy);

export default router;
