"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const user_model_1 = require("../model/user-model");
const user_validation_1 = require("../validation/user-validation");
const validation_1 = require("../validation/validation");
class UserService {
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedRequest = validation_1.Validation.validate(user_validation_1.UserValidation.REGISTER, request);
            const existingUserByUsername = yield database_1.prismaClient.user.findUnique({
                where: {
                    username: validatedRequest.username,
                },
            });
            if (existingUserByUsername) {
                throw new response_error_1.ResponseError(400, "Username already exist");
            }
            validatedRequest.password = yield bcrypt_1.default.hash(validatedRequest.password, 10);
            const user = yield database_1.prismaClient.user.create({
                data: validatedRequest,
            });
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedRequest = validation_1.Validation.validate(user_validation_1.UserValidation.LOGIN, request);
            let user = yield database_1.prismaClient.user.findUnique({
                where: {
                    username: validatedRequest.username,
                },
            });
            if (!user) {
                throw new response_error_1.ResponseError(401, "Username or password is wrong");
            }
            const isPasswordValid = yield bcrypt_1.default.compare(validatedRequest.password, user.password);
            if (!isPasswordValid) {
                throw new response_error_1.ResponseError(401, "Username or password is wrong");
            }
            user = yield database_1.prismaClient.user.update({
                where: {
                    username: validatedRequest.username,
                },
                data: {
                    token: (0, uuid_1.v4)(),
                },
            });
            const response = (0, user_model_1.toUserResponse)(user);
            response.token = user.token;
            return response;
        });
    }
    static get(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    static update(request, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedRequest = validation_1.Validation.validate(user_validation_1.UserValidation.UPDATE, request);
            const userToUpdate = user;
            if (validatedRequest.name) {
                userToUpdate.name = validatedRequest.name;
            }
            if (validatedRequest.password) {
                userToUpdate.password = yield bcrypt_1.default.hash(validatedRequest.password, 10);
            }
            const updatedUser = yield database_1.prismaClient.user.update({
                where: {
                    username: userToUpdate.username,
                },
                data: {
                    name: userToUpdate.name,
                    password: userToUpdate.password,
                },
            });
            return (0, user_model_1.toUserResponse)(updatedUser);
        });
    }
    static logout(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.user.update({
                where: {
                    username: user.username,
                },
                data: {
                    token: null,
                },
            });
        });
    }
}
exports.UserService = UserService;
