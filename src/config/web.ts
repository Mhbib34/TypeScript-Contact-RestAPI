import express from "express";
import { publicRouter } from "../routes/public-apis";
import { errorMiddleware } from "../middleware/error-middleware";
import { authRouter } from "../routes/auth";
import { contactRouter } from "../routes/contact";

export const web = express();
web.use(express.json());
web.use("/api/users", publicRouter);
web.use("/api/auth", authRouter);
web.use("/api/contacts", contactRouter);

web.use(errorMiddleware);
