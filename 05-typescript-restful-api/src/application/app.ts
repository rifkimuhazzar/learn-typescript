import express from "express";
import { errorMiddleware } from "../middleware/error-middleware";
import { apiRouter } from "../route/api";
import { publicRouter } from "../route/public-api";

export const app = express();
app.use(express.json());
app.use(publicRouter);
app.use(apiRouter);
app.use(errorMiddleware);
