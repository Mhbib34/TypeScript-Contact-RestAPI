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
}
