import { z, ZodType } from "zod";

export class AddressValidation {
  static readonly CREATE: ZodType = z.object({
    street: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(100).optional(),
    province: z.string().min(1).max(100).optional(),
    country: z.string().min(1).max(100),
    postal_code: z.string().min(1).max(100),
  });

  static readonly GET: ZodType = z.object({
    contact_id: z.number().min(1),
    id: z.number().min(1),
  });

  static readonly UPDATE: ZodType = z.object({
    contact_id: z.number().min(1),
    id: z.number().min(1),
    street: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(100).optional(),
    province: z.string().min(1).max(100).optional(),
    country: z.string().min(1).max(100),
    postal_code: z.string().min(1).max(100),
  });

  static readonly REMOVE: ZodType = this.GET;

  static readonly LIST: ZodType = z.object({
    contact_id: z.number().min(1),
  });
}
