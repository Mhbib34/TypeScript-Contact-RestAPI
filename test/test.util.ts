import { Address, Contact, User } from "@prisma/client";
import { prismaClient } from "../src/config/database";
import bcrypt from "bcrypt";

export class UserTest {
  static async deleteUser() {
    await prismaClient.user.deleteMany({
      where: {
        username: "test",
      },
    });
  }

  static async createUser() {
    await prismaClient.user.create({
      data: {
        username: "test",
        password: await bcrypt.hash("test123", 10),
        name: "test",
        token: "test",
      },
    });
  }

  static async get(): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        username: "test",
      },
    });

    if (!user) {
      throw new Error("User is not found");
    }

    return user;
  }
}

export class ContactTest {
  static async deleteContact() {
    await prismaClient.contact.deleteMany({
      where: {
        username: "test",
      },
    });
  }

  static async createContact() {
    await prismaClient.contact.create({
      data: {
        first_name: "test contact",
        last_name: "test contact",
        email: "test@test.com",
        phone: "089999999999",
        username: "test",
      },
    });
  }

  static async get(): Promise<Contact> {
    const contact = await prismaClient.contact.findFirst({
      where: {
        username: "test",
      },
    });

    if (!contact) {
      throw new Error("Contact is not found");
    }
    return contact;
  }
}

export class AddressTest {
  static async deleteAll() {
    await prismaClient.address.deleteMany({
      where: {
        contact: {
          username: "test",
        },
      },
    });
  }

  static async createAddress() {
    const contact = await ContactTest.get();
    await prismaClient.address.create({
      data: {
        contactId: contact.id,
        street: "test street",
        city: "test city",
        province: "test province",
        country: "test country",
        postal_code: "1212",
      },
    });
  }

  static async get(): Promise<Address> {
    const address = await prismaClient.address.findFirst({
      where: {
        contact: {
          username: "test",
        },
      },
    });

    if (!address) {
      throw new Error("Address is not found");
    }
    return address;
  }
}
