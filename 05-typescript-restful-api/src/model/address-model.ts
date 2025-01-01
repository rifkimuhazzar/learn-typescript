import { Address } from "@prisma/client";

export interface CreateAddressRequest {
  street?: string;
  city?: string;
  province?: string;
  country: string;
  postal_code: string;
}

export interface GetAddressRequest {
  contact_id: number;
  id: number;
}

export interface UpdateAddressRequest {
  contact_id: number;
  id: number;
  street?: string;
  city?: string;
  province?: string;
  country: string;
  postal_code: string;
}

export interface RemoveAddressRequest extends GetAddressRequest {}

export interface ListAddressRequest {
  contact_id: number;
}

export interface AddressResponse {
  id: number;
  street: string | null;
  city: string | null;
  province: string | null;
  country: string;
  postal_code: string;
}

export function toAddressResponse(address: Address): AddressResponse {
  return {
    id: address.id,
    street: address.street,
    city: address.city,
    province: address.province,
    country: address.country,
    postal_code: address.postal_code,
  };
}
