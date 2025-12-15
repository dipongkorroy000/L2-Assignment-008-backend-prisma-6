import express, {type Application, type Request, type Response} from "express";
import router from "./app/routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import {StripeController} from "./app/modules/stripe/stripe.controller";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import config from "./config";

const app: Application = express();

// this webhook call(stripe call this api) -> when tourist can book then call this webhook for payment
app.post("/api/v1/payment/webhook", express.raw({type: "application/json"}), StripeController.handleStripeWebhookEvent);

app.use(cors({origin: config.FRONTEND_URL, credentials: true}));
// parser
app.use(express.json());

app.use(cookieParser());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);

export default app;
