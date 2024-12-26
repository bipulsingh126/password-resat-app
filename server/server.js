import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/Db.js";
import authRouter from "./routes/authRoute.js";

const app = express();

const port = process.env.PORT || 4000;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

app.use("/api/auth", authRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));

app.get("/", (req, res) => {
  res.send("Server is running fine ");
});
