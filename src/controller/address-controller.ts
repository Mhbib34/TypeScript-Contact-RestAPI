import { NextFunction, Response } from "express";
import { CreateAddressRequest } from "../model/address-model";
import { UserRequest } from "../type/user-request";
import { AddressService } from "../service/address-service";

export class AddressController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateAddressRequest = req.body as CreateAddressRequest;
      request.contactId = parseInt(req.params.contactId);
      const result = await AddressService.create(req.user!, request);
      res.status(201).json({
        success: true,
        message: "Created Address Successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
