import { z } from "zod";

export const DocumentEntrySchema = z.object({
  date: z.string().min(1, { message: "date is required" }),
  amount: z.number().min(1, { message: "amount is required" }),
  type: z.string().min(4, { message: "type is required" }),
  file: z.custom((file) => {
    if (!(file instanceof File)) {
      return "file must be a File object";
    }
    if (file.size === 0) {
      return "file size cannot be zero";
    }
    return true; // Validation passed
  }),
});
