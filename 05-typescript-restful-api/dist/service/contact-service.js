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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const contact_model_1 = require("../model/contact-model");
const validation_1 = require("../validation/validation");
const contact_validation_1 = require("../validation/contact-validation");
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
class ContactService {
    static create(request, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedRequest = validation_1.Validation.validate(contact_validation_1.ContactValidation.CREATE, request);
            const newContact = yield database_1.prismaClient.contact.create({
                data: Object.assign(Object.assign({}, validatedRequest), { user_username: user.username }),
            });
            return (0, contact_model_1.toContactResponse)(newContact);
        });
    }
    static checkContactMustExist(contactId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield database_1.prismaClient.contact.findUnique({
                where: {
                    id: contactId,
                    user_username: user.username,
                },
            });
            if (!contact) {
                throw new response_error_1.ResponseError(404, "Contact is not found");
            }
            return contact;
        });
    }
    static get(contactId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield this.checkContactMustExist(contactId, user);
            return (0, contact_model_1.toContactResponse)(contact);
        });
    }
    static update(contactId, request, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedRequest = validation_1.Validation.validate(contact_validation_1.ContactValidation.UPDATE, request);
            yield this.checkContactMustExist(contactId, user);
            const updatedContact = yield database_1.prismaClient.contact.update({
                where: {
                    id: contactId,
                    user_username: user.username,
                },
                data: Object.assign({ id: contactId }, validatedRequest),
            });
            return (0, contact_model_1.toContactResponse)(updatedContact);
        });
    }
    static remove(contactId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkContactMustExist(contactId, user);
            yield database_1.prismaClient.contact.delete({
                where: {
                    id: contactId,
                    user_username: user.username,
                },
            });
        });
    }
    static search(request, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedRequest = validation_1.Validation.validate(contact_validation_1.ContactValidation.SEARCH, request);
            const filters = [];
            if (validatedRequest.name) {
                filters.push({
                    OR: [
                        { first_name: { contains: validatedRequest.name } },
                        { last_name: { contains: validatedRequest.name } },
                    ],
                });
            }
            if (validatedRequest.email) {
                filters.push({ email: { contains: validatedRequest.email } });
            }
            if (validatedRequest.phone) {
                filters.push({ phone: { contains: validatedRequest.phone } });
            }
            const contacts = yield database_1.prismaClient.contact.findMany({
                where: {
                    user_username: user.username,
                    AND: filters,
                },
                take: validatedRequest.size,
                skip: (validatedRequest.page - 1) * validatedRequest.size,
            });
            const total = yield database_1.prismaClient.contact.count({
                where: {
                    user_username: user.username,
                    AND: filters,
                },
            });
            return {
                data: contacts.map((contact) => (0, contact_model_1.toContactResponse)(contact)),
                paging: {
                    size: validatedRequest.size,
                    current_page: validatedRequest.page,
                    total_page: Math.ceil(total / validatedRequest.size),
                },
            };
        });
    }
}
exports.ContactService = ContactService;
