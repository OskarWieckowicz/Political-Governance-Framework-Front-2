import { z } from "zod";

export const DocumentEntrySchema = z.object({
  date: z.string().min(1, { message: "date is required" }),
  amount: z.number().min(1, { message: "amount is required" }),
  type: z.string().min(4, { message: "type is required" }),
  file: z
    .any()
    .refine((file) => file instanceof File, {
      message: "file must be a File object",
    })
    .refine((file) => file.size > 0, { message: "file size cannot be zero" }),
});
