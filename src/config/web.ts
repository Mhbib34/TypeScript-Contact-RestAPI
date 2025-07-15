import express from "express";
import { publicRouter } from "../routes/public-apis";
import { errorMiddleware } from "../middleware/error-middleware";

export const web = express();
web.use(express.json());
web.use("/api/users", publicRouter);

web.use(errorMiddleware);
