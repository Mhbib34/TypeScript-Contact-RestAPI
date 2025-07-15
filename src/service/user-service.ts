import { prismaClient } from "../config/database";
import { ResponseError } from "../error/response-error";
import {
  CreateUserRequest,
  toUserResponse,
  UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";

export class UserService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const userValidate = Validation.validate(UserValidation.REGISTER, request);
    const findUser = await prismaClient.user.findUnique({
      where: {
        username: userValidate.username,
      },
    });

    if (findUser) throw new ResponseError(400, "Username already exists");
    userValidate.password = await bcrypt.hash(userValidate.password, 10);

    const user = await prismaClient.user.create({
      data: userValidate,
    });

    return toUserResponse(user);
  }
}
