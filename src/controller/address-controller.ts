import { NextFunction, Response } from "express";
import {
  CreateAddressRequest,
  GetAddress,
  UpdateAddressRequest,
} from "../model/address-model";
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

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: GetAddress = {
        id: parseInt(req.params.addressId),
        contactId: parseInt(req.params.contactId),
      };
      const response = await AddressService.get(req.user!, request);
      res.status(200).json({
        success: true,
        message: "Get Address Successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateAddressRequest = req.body as UpdateAddressRequest;
      request.contactId = parseInt(req.params.contactId);
      request.id = parseInt(req.params.addressId);
      const response = await AddressService.update(req.user!, request);
      res.status(200).json({
        success: true,
        message: "Get Address Successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
