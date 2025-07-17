import { User } from "@prisma/client";
import {
  AddressResponse,
  CreateAddressRequest,
  GetAddress,
  toAddressResponse,
} from "../model/address-model";
import { AddressValidation } from "../validation/address-validation";
import { Validation } from "../validation/validation";
import { ContactService } from "./contact-service";
import { prismaClient } from "../config/database";
import { ResponseError } from "../error/response-error";

export class AddressService {
  static async create(
    user: User,
    request: CreateAddressRequest
  ): Promise<AddressResponse> {
    const addressRequest = Validation.validate(
      AddressValidation.CREATE,
      request
    );
    await ContactService.checkContactMustExist(
      user.username,
      request.contactId
    );

    const address = await prismaClient.address.create({
      data: addressRequest,
    });
    return toAddressResponse(address);
  }

  static async get(user: User, request: GetAddress): Promise<AddressResponse> {
    const getRequest = Validation.validate(AddressValidation.GET, request);
    await ContactService.checkContactMustExist(
      user.username,
      getRequest.contactId
    );
    const address = await prismaClient.address.findFirst({
      where: {
        id: getRequest.id,
        contactId: getRequest.contactId,
      },
    });
    if (!address) throw new ResponseError(404, "Address is not found");

    return toAddressResponse(address);
  }
}
