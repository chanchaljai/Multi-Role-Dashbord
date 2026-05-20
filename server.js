import express from "express";
import cors from "cors";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/authRoute.js";


const app = express();
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", router);

app.get("/", (req, res) => {
    res.send("Hello World!");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});