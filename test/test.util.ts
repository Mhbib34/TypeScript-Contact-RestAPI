import { prismaClient } from "../src/config/database";

export class UserTest {
  static async deleteUser() {
    await prismaClient.user.deleteMany({
      where: {
        username: "test",
      },
    });
  }
}
