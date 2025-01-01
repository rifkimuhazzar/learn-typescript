import { Contact } from "@prisma/client";

export type CreateContactRequest = {
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
};

export interface UpdateContactRequest extends CreateContactRequest {}

export interface SearchContactRequest {
  name?: string;
  email?: string;
  phone?: string;
  page: number;
  size: number;
}

export type ContactResponse = {
  id: number;
  first_name: string;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
};

export function toContactResponse(contact: Contact): ContactResponse {
  return {
    id: contact.id,
    first_name: contact.first_name,
    last_name: contact.last_name,
    email: contact.email,
    phone: contact.phone,
  };
}
