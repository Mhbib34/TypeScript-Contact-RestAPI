import express from "express";
import { UserController } from "../controller/user-controller";
import { authMiddleware } from "../middleware/auth-middleware";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

apiRouter.get("/", UserController.get);
apiRouter.patch("/", UserController.update);
apiRouter.delete("/", UserController.logout);
