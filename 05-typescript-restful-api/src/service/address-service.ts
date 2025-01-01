import { Address, User } from "@prisma/client";
import {
  AddressResponse,
  CreateAddressRequest,
  GetAddressRequest,
  ListAddressRequest,
  RemoveAddressRequest,
  toAddressResponse,
  UpdateAddressRequest,
} from "../model/address-model";
import { Validation } from "../validation/validation";
import { AddressValidation } from "../validation/address-validation";
import { prismaClient } from "../application/database";
import { ContactService } from "./contact-service";
import { ResponseError } from "../error/response-error";

export class AddressService {
  static async create(
    request: CreateAddressRequest,
    user: User,
    contactId: number
  ): Promise<AddressResponse> {
    await ContactService.checkContactMustExist(contactId, user);
    const validatedRequest = Validation.validate(
      AddressValidation.CREATE,
      request
    );

    const newAddress = await prismaClient.address.create({
      data: {
        ...validatedRequest,
        contact_id: contactId,
      },
    });

    return toAddressResponse(newAddress);
  }

  private static async ensureAdressExist(
    contact_id: number,
    id: number
  ): Promise<Address> {
    const address = await prismaClient.address.findUnique({
      where: {
        id: id,
        contact_id: contact_id,
      },
    });

    if (!address) {
      throw new ResponseError(404, "Address is not found");
    }

    return address;
  }

  static async get(
    user: User,
    params: GetAddressRequest
  ): Promise<AddressResponse> {
    const validatedRequest = Validation.validate(AddressValidation.GET, params);
    await ContactService.checkContactMustExist(
      validatedRequest.contact_id,
      user
    );
    const address = await this.ensureAdressExist(
      validatedRequest.contact_id,
      validatedRequest.id
    );
    return toAddressResponse(address);
  }

  static async update(
    user: User,
    request: UpdateAddressRequest
  ): Promise<AddressResponse> {
    const validatedRequest = Validation.validate(
      AddressValidation.UPDATE,
      request
    );
    await ContactService.checkContactMustExist(
      validatedRequest.contact_id,
      user
    );
    await this.ensureAdressExist(
      validatedRequest.contact_id,
      validatedRequest.id
    );

    const updatedAdress = await prismaClient.address.update({
      where: {
        contact_id: validatedRequest.contact_id,
        id: validatedRequest.id,
      },
      data: validatedRequest,
    });

    return toAddressResponse(updatedAdress);
  }

  static async remove(
    user: User,
    request: RemoveAddressRequest
  ): Promise<void> {
    const validatedRequest = Validation.validate(
      AddressValidation.REMOVE,
      request
    );
    await ContactService.checkContactMustExist(
      validatedRequest.contact_id,
      user
    );
    await this.ensureAdressExist(
      validatedRequest.contact_id,
      validatedRequest.id
    );
    await prismaClient.address.delete({
      where: {
        id: validatedRequest.id,
        contact_id: validatedRequest.contact_id,
      },
    });
  }

  static async list(
    user: User,
    request: ListAddressRequest
  ): Promise<AddressResponse[] | string> {
    const validatedRequest = Validation.validate(
      AddressValidation.LIST,
      request
    );
    await ContactService.checkContactMustExist(
      validatedRequest.contact_id,
      user
    );

    const addresses = await prismaClient.address.findMany({
      where: {
        contact_id: validatedRequest.contact_id,
      },
    });

    if (!addresses.length) {
      return "There is no address yet";
    }

    return addresses.map((address) => toAddressResponse(address));
  }
}
