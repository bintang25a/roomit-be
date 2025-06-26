import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import RoomRoute from "./routes/RoomRoute.js";
import LoanRoute from "./routes/LoanRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import { db } from "./models/index.js";

dotenv.config();

const app = express();
const port = process.env.APP_PORT;

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
   db,
});

app.use(
   session({
      secret: process.env.SESS_KEY,
      resave: false,
      saveUninitialized: true,
      store,
      cookie: {
         secure: "auto",
      },
   })
);

app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(RoomRoute);
app.use(LoanRoute);
app.use(AuthRoute);
app.use("/rooms/images", express.static("uploads"));

// (async () => {
//    try {
//       await db.sync({ force: true });
//       console.log("Database synced (tables created)");
//    } catch (err) {
//       console.error("Gagal sync:", err);
//    }
// })();

// store.sync();

app.listen(port, () => console.log(`Server run on http://127.0.0.1:${port}`));
