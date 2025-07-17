import z, { ZodType } from "zod";
import {
  ContactRequest,
  SearchContactRequest,
  UpdateContactRequest,
} from "../model/contact-model";

export class ContactValidation {
  static readonly CREATE: ZodType<ContactRequest> = z.object({
    first_name: z.string().min(1).max(100),
    last_name: z.string().min(1).max(100).optional(),
    email: z.string().min(1).max(100).email().optional(),
    phone: z.string().min(1).max(20).optional(),
  });
  static readonly UPDATE: ZodType<UpdateContactRequest> = z.object({
    id: z.number().positive(),
    first_name: z.string().min(1).max(100),
    last_name: z.string().min(1).max(100).optional(),
    email: z.string().min(1).max(100).email().optional(),
    phone: z.string().min(1).max(20).optional(),
  });
  static readonly SEARCH: ZodType<SearchContactRequest> = z.object({
    name: z.string().min(1).max(100).optional(),
    email: z.string().min(1).max(100).email().optional(),
    phone: z.string().min(1).max(20).optional(),
    page: z.number().positive().min(1),
    size: z.number().positive().min(1).max(100),
  });
}
