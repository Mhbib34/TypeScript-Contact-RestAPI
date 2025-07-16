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
}
