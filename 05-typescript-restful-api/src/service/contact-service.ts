import { Contact, User } from "@prisma/client";
import {
  ContactResponse,
  CreateContactRequest,
  SearchContactRequest,
  toContactResponse,
  UpdateContactRequest,
} from "../model/contact-model";
import { Validation } from "../validation/validation";
import { ContactValidation } from "../validation/contact-validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";

export class ContactService {
  static async create(
    request: CreateContactRequest,
    user: User
  ): Promise<ContactResponse> {
    const validatedRequest = Validation.validate(
      ContactValidation.CREATE,
      request
    );

    const newContact = await prismaClient.contact.create({
      data: { ...validatedRequest, user_username: user.username },
    });

    return toContactResponse(newContact);
  }

  static async checkContactMustExist(
    contactId: number,
    user: User
  ): Promise<Contact> {
    const contact = await prismaClient.contact.findUnique({
      where: {
        id: contactId,
        user_username: user.username,
      },
    });

    if (!contact) {
      throw new ResponseError(404, "Contact is not found");
    }

    return contact;
  }

  static async get(contactId: number, user: User): Promise<ContactResponse> {
    const contact = await this.checkContactMustExist(contactId, user);
    return toContactResponse(contact);
  }

  static async update(
    contactId: number,
    request: UpdateContactRequest,
    user: User
  ): Promise<ContactResponse> {
    const validatedRequest = Validation.validate(
      ContactValidation.UPDATE,
      request
    );

    await this.checkContactMustExist(contactId, user);

    const updatedContact = await prismaClient.contact.update({
      where: {
        id: contactId,
        user_username: user.username,
      },
      data: { id: contactId, ...validatedRequest },
    });

    return toContactResponse(updatedContact);
  }

  static async remove(contactId: number, user: User): Promise<void> {
    await this.checkContactMustExist(contactId, user);
    await prismaClient.contact.delete({
      where: {
        id: contactId,
        user_username: user.username,
      },
    });
  }

  static async search(
    request: SearchContactRequest,
    user: User
  ): Promise<Pageable<ContactResponse>> {
    const validatedRequest = Validation.validate(
      ContactValidation.SEARCH,
      request
    );

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

    const contacts = await prismaClient.contact.findMany({
      where: {
        user_username: user.username,
        AND: filters,
      },
      take: validatedRequest.size,
      skip: (validatedRequest.page - 1) * validatedRequest.size,
    });
    const total = await prismaClient.contact.count({
      where: {
        user_username: user.username,
        AND: filters,
      },
    });

    return {
      data: contacts.map((contact) => toContactResponse(contact)),
      paging: {
        size: validatedRequest.size,
        current_page: validatedRequest.page,
        total_page: Math.ceil(total / validatedRequest.size),
      },
    };
  }
}
