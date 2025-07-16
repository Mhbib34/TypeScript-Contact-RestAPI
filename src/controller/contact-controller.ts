import { NextFunction, Response } from "express";
import { ContactRequest } from "../model/contact-model";
import { ContactService } from "../service/contact-service";
import { UserRequest } from "../type/user-request";

export class ContactController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: ContactRequest = req.body as ContactRequest;
      const result = await ContactService.create(req.user!, request);
      res.status(201).json({
        success: true,
        message: "Created Contact Successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const contactId = parseInt(req.params.contactId);
      const result = await ContactService.get(req.user!, contactId);
      res.status(200).json({
        success: true,
        message: "Get Contact Successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
