import { User } from "@prisma/client";
import {
  ContactRequest,
  ContactResponse,
  toContactResponse,
} from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../config/database";
import { ResponseError } from "../error/response-error";

export class ContactService {
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
    const contact = await prismaClient.contact.findUnique({
      where: {
        id,
        username: user.username,
      },
    });

    if (!contact) throw new ResponseError(404, "Contact is not found");

    return toContactResponse(contact!);
  }
}
