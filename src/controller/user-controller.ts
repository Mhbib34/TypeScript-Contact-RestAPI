import { NextFunction, Request, Response } from "express";
import {
  CreateUserRequest,
  LoginUserRequest,
  UpdateUserRequest,
} from "../model/user-model";
import { UserService } from "../service/user-service";
import { UserRequest } from "../type/user-request";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;
      const response = await UserService.register(request);
      res.status(201).json({
        success: true,
        message: "Created User Successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginUserRequest = req.body as LoginUserRequest;
      const response = await UserService.login(request);
      res.status(200).json({
        success: true,
        message: "Login User Successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await UserService.get(req.user!);
      res.status(200).json({
        success: true,
        message: "Get User Successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateUserRequest = req.body as UpdateUserRequest;
      const response = await UserService.update(req.user!, request);
      res.status(200).json({
        success: true,
        message: "Update User Successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: UserRequest, res: Response, next: NextFunction) {
    try {
      await UserService.logout(req.user!);
      res.status(200).json({
        success: true,
        message: "User Logout Successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
