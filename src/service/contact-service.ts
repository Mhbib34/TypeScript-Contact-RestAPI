import { User } from "@prisma/client";
import {
  ContactRequest,
  ContactResponse,
  toContactResponse,
} from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../config/database";

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
}
