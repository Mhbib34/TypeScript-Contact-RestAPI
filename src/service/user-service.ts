import { prismaClient } from "../config/database";
import { ResponseError } from "../error/response-error";
import {
  CreateUserRequest,
  LoginUserRequest,
  toUserResponse,
  UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

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

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);
    let user = await prismaClient.user.findUnique({
      where: {
        username: loginRequest.username,
      },
    });

    if (!user) throw new ResponseError(401, "Email or password is incorrect");

    const isMatch = await bcrypt.compare(loginRequest.password, user.password);

    if (!isMatch)
      throw new ResponseError(401, "Email or password is incorrect");

    user = await prismaClient.user.update({
      where: {
        username: loginRequest.username,
      },
      data: {
        token: uuid(),
      },
    });

    const response = toUserResponse(user);
    response.token = user.token!;
    return response;
  }
}
