import { User } from "@prisma/client";
import {
  ContactRequest,
  ContactResponse,
  SearchContactRequest,
  toContactResponse,
  UpdateContactRequest,
} from "../model/contact-model";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../config/database";
import { ResponseError } from "../error/response-error";
import { pagingResponse } from "../model/page";

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

  static async remove(user: User, id: number) {
    await this.checkContactMustExist(user.username, id);
    const result = await prismaClient.contact.delete({
      where: {
        id,
        username: user.username,
      },
    });
    return toContactResponse(result);
  }

  static async search(
    user: User,
    request: SearchContactRequest
  ): Promise<pagingResponse<ContactResponse>> {
    const searchRequest = Validation.validate(
      ContactValidation.SEARCH,
      request
    );
    const skip = (searchRequest.page - 1) * searchRequest.size;

    const filters = [];
    if (searchRequest.name) {
      filters.push({
        OR: [
          {
            first_name: {
              contains: searchRequest.name,
            },
          },
          {
            last_name: {
              contains: searchRequest.name,
            },
          },
        ],
      });
    }

    if (searchRequest.email) {
      filters.push({
        email: {
          contains: searchRequest.email,
        },
      });
    }

    if (searchRequest.phone) {
      filters.push({
        phone: {
          contains: searchRequest.phone,
        },
      });
    }

    const contacs = await prismaClient.contact.findMany({
      where: {
        username: user.username,
        AND: filters,
      },
      skip,
      take: searchRequest.size,
    });

    const total = await prismaClient.contact.count({
      where: {
        username: user.username,
        AND: filters,
      },
    });

    return {
      data: contacs.map((contact) => toContactResponse(contact)),
      paging: {
        current_page: searchRequest.page,
        size: searchRequest.size,
        total_page: Math.ceil(total / searchRequest.size),
      },
    };
  }
}
