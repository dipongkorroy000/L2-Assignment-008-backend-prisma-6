import express, { type Express } from "express";
import cors from "cors";
import dotenv from "dotenv";

const app: Express = express();

app.use(cors());
app.use(express.json());

dotenv.config();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route Not Found" });
});

export default app;