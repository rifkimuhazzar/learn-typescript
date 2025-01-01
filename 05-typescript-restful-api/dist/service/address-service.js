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
exports.AddressService = void 0;
const address_model_1 = require("../model/address-model");
const validation_1 = require("../validation/validation");
const address_validation_1 = require("../validation/address-validation");
const database_1 = require("../application/database");
const contact_service_1 = require("./contact-service");
const response_error_1 = require("../error/response-error");
class AddressService {
    static create(request, user, contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield contact_service_1.ContactService.checkContactMustExist(contactId, user);
            const validatedRequest = validation_1.Validation.validate(address_validation_1.AddressValidation.CREATE, request);
            const newAddress = yield database_1.prismaClient.address.create({
                data: Object.assign(Object.assign({}, validatedRequest), { contact_id: contactId }),
            });
            return (0, address_model_1.toAddressResponse)(newAddress);
        });
    }
    static ensureAdressExist(contact_id, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const address = yield database_1.prismaClient.address.findUnique({
                where: {
                    id: id,
                    contact_id: contact_id,
                },
            });
            if (!address) {
                throw new response_error_1.ResponseError(404, "Address is not found");
            }
            return address;
        });
    }
    static get(user, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedRequest = validation_1.Validation.validate(address_validation_1.AddressValidation.GET, params);
            yield contact_service_1.ContactService.checkContactMustExist(validatedRequest.contact_id, user);
            const address = yield this.ensureAdressExist(validatedRequest.contact_id, validatedRequest.id);
            return (0, address_model_1.toAddressResponse)(address);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedRequest = validation_1.Validation.validate(address_validation_1.AddressValidation.UPDATE, request);
            yield contact_service_1.ContactService.checkContactMustExist(validatedRequest.contact_id, user);
            yield this.ensureAdressExist(validatedRequest.contact_id, validatedRequest.id);
            const updatedAdress = yield database_1.prismaClient.address.update({
                where: {
                    contact_id: validatedRequest.contact_id,
                    id: validatedRequest.id,
                },
                data: validatedRequest,
            });
            return (0, address_model_1.toAddressResponse)(updatedAdress);
        });
    }
    static remove(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedRequest = validation_1.Validation.validate(address_validation_1.AddressValidation.REMOVE, request);
            yield contact_service_1.ContactService.checkContactMustExist(validatedRequest.contact_id, user);
            yield this.ensureAdressExist(validatedRequest.contact_id, validatedRequest.id);
            yield database_1.prismaClient.address.delete({
                where: {
                    id: validatedRequest.id,
                    contact_id: validatedRequest.contact_id,
                },
            });
        });
    }
    static list(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedRequest = validation_1.Validation.validate(address_validation_1.AddressValidation.LIST, request);
            yield contact_service_1.ContactService.checkContactMustExist(validatedRequest.contact_id, user);
            const addresses = yield database_1.prismaClient.address.findMany({
                where: {
                    contact_id: validatedRequest.contact_id,
                },
            });
            if (!addresses.length) {
                return "There is no address yet";
            }
            return addresses.map((address) => (0, address_model_1.toAddressResponse)(address));
        });
    }
}
exports.AddressService = AddressService;
