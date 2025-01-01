import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateUserRequest,
  LoginUserRequest,
  toUserResponse,
  UpdateUserRequest,
  UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";

export class UserService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const validatedRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );

    const existingUserByUsername = await prismaClient.user.findUnique({
      where: {
        username: validatedRequest.username,
      },
    });

    if (existingUserByUsername) {
      throw new ResponseError(400, "Username already exist");
    }

    validatedRequest.password = await bcrypt.hash(
      validatedRequest.password,
      10
    );

    const user = await prismaClient.user.create({
      data: validatedRequest,
    });

    return toUserResponse(user);
  }

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    const validatedRequest = Validation.validate(UserValidation.LOGIN, request);

    let user = await prismaClient.user.findUnique({
      where: {
        username: validatedRequest.username,
      },
    });

    if (!user) {
      throw new ResponseError(401, "Username or password is wrong");
    }

    const isPasswordValid = await bcrypt.compare(
      validatedRequest.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new ResponseError(401, "Username or password is wrong");
    }

    user = await prismaClient.user.update({
      where: {
        username: validatedRequest.username,
      },
      data: {
        token: uuidV4(),
      },
    });

    const response = toUserResponse(user);
    response.token = user.token!;
    return response;
  }

  static async get(user: User): Promise<UserResponse> {
    return toUserResponse(user);
  }

  static async update(
    request: UpdateUserRequest,
    user: User
  ): Promise<UserResponse> {
    const validatedRequest = Validation.validate(
      UserValidation.UPDATE,
      request
    );

    const userToUpdate = user;
    if (validatedRequest.name) {
      userToUpdate.name = validatedRequest.name;
    }
    if (validatedRequest.password) {
      userToUpdate.password = await bcrypt.hash(validatedRequest.password, 10);
    }

    const updatedUser = await prismaClient.user.update({
      where: {
        username: userToUpdate.username,
      },
      data: {
        name: userToUpdate.name,
        password: userToUpdate.password,
      },
    });

    return toUserResponse(updatedUser);
  }

  static async logout(user: User): Promise<void> {
    await prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: {
        token: null,
      },
    });
  }
}
