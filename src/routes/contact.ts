import express from "express";
import { ContactController } from "../controller/contact-controller";
import { authMiddleware } from "../middleware/auth-middleware";
import { AddressController } from "../controller/address-controller";

export const contactRouter = express.Router();
contactRouter.use(authMiddleware);

contactRouter.post("/", ContactController.create);
contactRouter.put("/:contactId", ContactController.update);
contactRouter.delete("/:contactId", ContactController.remove);
contactRouter.get("/:contactId", ContactController.get);
contactRouter.get("/", ContactController.search);

//adress

contactRouter.post("/:contactId/addresses", AddressController.create);
contactRouter.get("/:contactId/addresses/:addressId", AddressController.get);
