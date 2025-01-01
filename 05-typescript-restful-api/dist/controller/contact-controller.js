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
exports.ContactController = void 0;
const contact_service_1 = require("../service/contact-service");
class ContactController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield contact_service_1.ContactService.create(request, req.user);
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
                const contactId = Number(req.params.contactId);
                const user = req.user;
                const response = yield contact_service_1.ContactService.get(contactId, user);
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
                const request = req.body;
                const user = req.user;
                const contactId = Number(req.params.contactId);
                const response = yield contact_service_1.ContactService.update(contactId, request, user);
                res.status(200).json({
                    data: response,
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
                const contactId = Number(req.params.contactId);
                yield contact_service_1.ContactService.remove(contactId, user);
                res.status(200).json({
                    data: "OK",
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static search(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const request = {
                    name: req.query.name,
                    email: req.query.email,
                    phone: req.query.phone,
                    size: req.query.size ? Number(req.query.size) : 10,
                    page: req.query.page ? Number(req.query.page) : 1,
                };
                const response = yield contact_service_1.ContactService.search(request, user);
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ContactController = ContactController;
