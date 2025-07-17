import { User } from "@prisma/client";
import {
  ContactRequest,
  ContactResponse,
  toContactResponse,
  UpdateContactRequest,
} from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../config/database";
import { ResponseError } from "../error/response-error";

export class ContactService {
  static async checkContactMustExist(username: string, contactId: number) {
    const contact = await prismaClient.contact.findUnique({
      where: {
        id: contactId,
        username,
      },
    });
    if (!contact) throw new ResponseError(404, "Contact is not found");
    return contact;
  }
  static async create(
    user: User,
    request: ContactRequest
  ): Promise<ContactResponse> {
    const contactRequest = Validation.validate(
      ContactValidation.CREATE,
      request
    );

    const result = await prismaClient.contact.create({
      data: {
        first_name: contactRequest.first_name,
        last_name: contactRequest.last_name,
        email: contactRequest.email,
        phone: contactRequest.phone,
        username: user.username,
      },
    });

    return toContactResponse(result);
  }

  static async get(user: User, id: number): Promise<ContactResponse> {
    const contact = await this.checkContactMustExist(user.username, id);
    return toContactResponse(contact!);
  }

  static async update(
    user: User,
    request: UpdateContactRequest
  ): Promise<ContactResponse> {
    const contactRequest = Validation.validate(
      ContactValidation.UPDATE,
      request
    );
    await this.checkContactMustExist(user.username, contactRequest.id);
    const result = await prismaClient.contact.update({
      where: {
        id: contactRequest.id,
        username: user.username,
      },
      data: contactRequest,
    });
    return toContactResponse(result);
  }
}
