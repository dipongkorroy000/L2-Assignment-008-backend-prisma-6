import express, { type Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import config from "./config";

const app: Express = express();

app.use(cors());
app.use(express.json());

dotenv.config();

app.get("/", (req, res) => {
  res.send({
    message: "Server is running",
    environment: config.node_env,
    uptime: process.uptime().toFixed(2) + "sec",
    timeStamp: new Date().toISOString(),
  });
});

app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route Not Found" });
});

export default app;
