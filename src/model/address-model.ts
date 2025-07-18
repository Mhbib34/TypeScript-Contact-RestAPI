import { Address } from "@prisma/client";

export type CreateAddressRequest = {
  contactId: number;
  street?: string;
  city?: string;
  province?: string;
  country: string;
  postal_code: string;
};
export type UpdateAddressRequest = {
  id: number;
  contactId: number;
  street?: string;
  city?: string;
  province?: string;
  country?: string;
  postal_code: string;
};

export type AddressResponse = {
  id: number;
  street?: string | null;
  city?: string | null;
  province?: string | null;
  country: string;
  postal_code: string;
};

export type GetAddress = {
  contactId: number;
  id: number;
};

export type RemoveAddress = GetAddress;

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
