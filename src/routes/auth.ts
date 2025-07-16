import express from "express";
import { UserController } from "../controller/user-controller";
import { authMiddleware } from "../middleware/auth-middleware";

export const authRouter = express.Router();
authRouter.use(authMiddleware);

//auth-apis
authRouter.get("/", UserController.get);
authRouter.patch("/", UserController.update);
authRouter.delete("/", UserController.logout);
