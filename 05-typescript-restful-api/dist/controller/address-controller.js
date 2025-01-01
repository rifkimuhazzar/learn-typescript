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
exports.AddressController = void 0;
const address_service_1 = require("../service/address-service");
class AddressController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const user = req.user;
                const contactId = Number(req.params.contactId);
                const response = yield address_service_1.AddressService.create(request, user, contactId);
                res.status(200).json({
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const params = {
                    contact_id: Number(req.params.contactId),
                    id: Number(req.params.addressId),
                };
                const response = yield address_service_1.AddressService.get(user, params);
                res.status(200).json({
                    data: response,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const request = req.body;
                request.contact_id = Number(req.params.contactId);
                request.id = Number(req.params.addressId);
                const result = yield address_service_1.AddressService.update(user, request);
                res.status(200).json({
                    data: result,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static remove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const request = {
                    contact_id: Number(req.params.contactId),
                    id: Number(req.params.addressId),
                };
                yield address_service_1.AddressService.remove(user, request);
                res.status(200).json({ data: "OK" });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const request = {
                    contact_id: Number(req.params.contactId),
                };
                const result = yield address_service_1.AddressService.list(user, request);
                res.status(200).json({
                    data: result,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.AddressController = AddressController;
