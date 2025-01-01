import { NextFunction, Response } from "express";
import { UserRequest } from "../type/user-request";
import {
  CreateAddressRequest,
  GetAddressRequest,
  ListAddressRequest,
  UpdateAddressRequest,
} from "../model/address-model";
import { AddressService } from "../service/address-service";

export class AddressController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request = req.body as CreateAddressRequest;
      const user = req.user;
      const contactId = Number(req.params.contactId);
      const response = await AddressService.create(request, user!, contactId);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const params = {
        contact_id: Number(req.params.contactId),
        id: Number(req.params.addressId),
      } as GetAddressRequest;
      const response = await AddressService.get(user!, params);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const request = req.body as UpdateAddressRequest;
      request.contact_id = Number(req.params.contactId);
      request.id = Number(req.params.addressId);
      const result = await AddressService.update(user!, request);
      res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async remove(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const request = {
        contact_id: Number(req.params.contactId),
        id: Number(req.params.addressId),
      };
      await AddressService.remove(user!, request);
      res.status(200).json({ data: "OK" });
    } catch (error) {
      next(error);
    }
  }

  static async list(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const request = {
        contact_id: Number(req.params.contactId),
      } as ListAddressRequest;
      const result = await AddressService.list(user!, request);
      res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
