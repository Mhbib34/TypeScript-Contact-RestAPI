import { User } from "@prisma/client";
import {
  AddressResponse,
  CreateAddressRequest,
  toAddressResponse,
} from "../model/address-model";
import { AddressValidation } from "../validation/address-validation";
import { Validation } from "../validation/validation";
import { ContactService } from "./contact-service";
import { prismaClient } from "../config/database";

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
}
