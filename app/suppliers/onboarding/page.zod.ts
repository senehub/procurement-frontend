import { z } from "zod";

export const supplierFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters." }),
  description: z.string().max(1000).optional(),
  address: z.string().min(5, { message: "Please provide a valid address." }),
  contactPhone: z
    .string()
    .min(10, { message: "Please provide a valid phone number." }),
  contactEmail: z
    .string()
    .email({ message: "Please provide a valid email address." }),
  website: z.string().url().optional(),
  taxId: z.string().min(1, { message: "Tax ID is required." }),
  paymentTerms: z.string().min(1, { message: "Please specify payment terms." }),
});

export type TypeSupplierFormSchema = z.infer<typeof supplierFormSchema>;
