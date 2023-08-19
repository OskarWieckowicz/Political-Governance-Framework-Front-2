import { z } from "zod";

export const DocumentEntrySchema = z.object({
  date: z.string().min(1, { message: "date is required" }),
  amount: z.number().min(1, { message: "amount is required" }),
  type: z.string().min(4, { message: "type is required" }),
  file: z.string().min(1, { message: "file is required" }),
});
