import { Address, User } from "@prisma/client";
import {
  AddressResponse,
  CreateAddressRequest,
  GetAddress,
  RemoveAddress,
  toAddressResponse,
  UpdateAddressRequest,
} from "../model/address-model";
import { AddressValidation } from "../validation/address-validation";
import { Validation } from "../validation/validation";
import { ContactService } from "./contact-service";
import { prismaClient } from "../config/database";
import { ResponseError } from "../error/response-error";

export class AddressService {
  static async checkAddressMustExist(
    contactId: number,
    addressId: number
  ): Promise<Address> {
    const address = await prismaClient.address.findFirst({
      where: {
        id: addressId,
        contactId,
      },
    });
    if (!address) throw new ResponseError(404, "Address is not found");
    return address;
  }
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
    const address = await this.checkAddressMustExist(
      getRequest.contactId,
      getRequest.id
    );

    return toAddressResponse(address);
  }

  static async update(
    user: User,
    request: UpdateAddressRequest
  ): Promise<AddressResponse> {
    const addressRequest = Validation.validate(
      AddressValidation.UPDATE,
      request
    );
    await ContactService.checkContactMustExist(
      user.username,
      request.contactId
    );
    await this.checkAddressMustExist(
      addressRequest.contactId,
      addressRequest.id
    );
    const address = await prismaClient.address.update({
      where: {
        id: addressRequest.id,
        contactId: addressRequest.contactId,
      },
      data: addressRequest,
    });
    return toAddressResponse(address);
  }

  static async remove(
    user: User,
    request: RemoveAddress
  ): Promise<AddressResponse> {
    const removeRequest = Validation.validate(
      AddressValidation.REMOVE,
      request
    );
    await ContactService.checkContactMustExist(
      user.username,
      request.contactId
    );
    await this.checkAddressMustExist(removeRequest.contactId, removeRequest.id);

    const address = await prismaClient.address.delete({
      where: {
        id: removeRequest.id,
        contactId: removeRequest.contactId,
      },
    });
    return toAddressResponse(address);
  }
}
