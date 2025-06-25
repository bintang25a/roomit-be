import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import RoomRoute from "./routes/RoomRoute.js";
import LoanRoute from "./routes/LoanRoute.js";
import { db } from "./models/index.js";

dotenv.config();

const app = express();
const port = process.env.APP_PORT;

app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(RoomRoute);
app.use(LoanRoute);
app.use("/images", express.static("uploads"));

(async () => {
   try {
      await db.sync({ force: true });
      console.log("Database synced (tables created)");
   } catch (err) {
      console.error("Gagal sync:", err);
   }
})();

app.listen(port, () => console.log(`Server run on http://127.0.0.1:${port}`));
