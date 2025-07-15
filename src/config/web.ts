import express from "express";
import { publicRouter } from "../routes/public-apis";
import { errorMiddleware } from "../middleware/error-middleware";
import { apiRouter } from "../routes/apis";

export const web = express();
web.use(express.json());
web.use("/api/users", publicRouter);
web.use("/api/auth", apiRouter);

web.use(errorMiddleware);
