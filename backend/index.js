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

app.use(
  cors({
    origin:"https://fullstack-eccomerce.onrender.com", // Your frontend URL
    // optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

app.use("/api", router);

// deployement
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
  dbConnect();
});
