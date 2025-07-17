import { NextFunction, Response } from "express";
import {
  ContactRequest,
  SearchContactRequest,
  UpdateContactRequest,
} from "../model/contact-model";
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

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateContactRequest = req.body as UpdateContactRequest;
      request.id = parseInt(req.params.contactId);
      const result = await ContactService.update(req.user!, request);
      res.status(200).json({
        success: true,
        message: "Update Contact Successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async remove(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const contactId = parseInt(req.params.contactId);
      await ContactService.remove(req.user!, contactId);
      res.status(200).json({
        success: true,
        message: "Remove Contact Successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async search(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: SearchContactRequest = {
        name: req.query.name as string,
        email: req.query.email as string,
        phone: req.query.phone as string,
        page: req.query.page ? parseInt(req.query.page as string) : 1,
        size: req.query.size ? parseInt(req.query.size as string) : 10,
      };
      const result = await ContactService.search(req.user!, request);
      res.status(200).json({
        success: true,
        message: "Search Contact Successfully",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }
}
