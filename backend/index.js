import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./config/dbconfig.js";
import cookieParser from "cookie-parser";
import path, { dirname } from "path";


dotenv.config();

import router from "./route/index.js";

const app = express();
app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

// deployement
const __dirname = path.resolve();



app.use("/api", router);


app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
  dbConnect();
});
