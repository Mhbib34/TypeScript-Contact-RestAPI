import z, { ZodType } from "zod";
import {
  CreateAddressRequest,
  GetAddress,
  RemoveAddress,
  UpdateAddressRequest,
} from "../model/address-model";

export class AddressValidation {
  static readonly CREATE: ZodType<CreateAddressRequest> = z.object({
    contactId: z.number().positive(),
    street: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(100).optional(),
    province: z.string().min(1).max(100).optional(),
    country: z.string().min(1).max(100),
    postal_code: z.string().min(1).max(100),
  });
  static readonly UPDATE: ZodType<UpdateAddressRequest> = z.object({
    id: z.number().positive(),
    contactId: z.number().positive(),
    street: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(100).optional(),
    province: z.string().min(1).max(100).optional(),
    country: z.string().min(1).max(100).optional(),
    postal_code: z.string().min(1).max(100),
  });

  static readonly GET: ZodType<GetAddress> = z.object({
    contactId: z.number().positive(),
    id: z.number().positive(),
  });
  static readonly REMOVE: ZodType<RemoveAddress> = z.object({
    contactId: z.number().positive(),
    id: z.number().positive(),
  });
}
