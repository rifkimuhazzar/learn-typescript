import { NextFunction, Response } from "express";
import { ContactService } from "../service/contact-service";
import { UserRequest } from "../type/user-request";
import {
  CreateContactRequest,
  UpdateContactRequest,
} from "../model/contact-model";

export class ContactController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request = req.body as CreateContactRequest;
      const response = await ContactService.create(request, req.user!);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const contactId = Number(req.params.contactId);
      const user = req.user;
      const response = await ContactService.get(contactId, user!);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request = req.body as UpdateContactRequest;
      const user = req.user;
      const contactId = Number(req.params.contactId);
      const response = await ContactService.update(contactId, request, user!);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async remove(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const contactId = Number(req.params.contactId);
      await ContactService.remove(contactId, user!);
      res.status(200).json({
        data: "OK",
      });
    } catch (error) {
      next(error);
    }
  }

  static async search(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const request = {
        name: req.query.name as string,
        email: req.query.email as string,
        phone: req.query.phone as string,
        size: req.query.size ? Number(req.query.size) : 10,
        page: req.query.page ? Number(req.query.page) : 1,
      };
      const response = await ContactService.search(request, user!);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
