import express, { type Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import config from "./config";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app: Express = express();

app.use(cors());
app.use(express.json());

dotenv.config();

app.use("/api/v1", router);

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

app.use(notFound);

app.use(globalErrorHandler);

export default app;
