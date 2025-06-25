import express from "express";
import cors from "cors";
import apiRoute from "./routes/api.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(apiRoute);

app.listen(port, () => console.log(`Server run on http://127.0.0.1:${port}`));
