"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const error_middleware_1 = require("../middleware/error-middleware");
const api_1 = require("../route/api");
const public_api_1 = require("../route/public-api");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(public_api_1.publicRouter);
exports.app.use(api_1.apiRouter);
exports.app.use(error_middleware_1.errorMiddleware);
