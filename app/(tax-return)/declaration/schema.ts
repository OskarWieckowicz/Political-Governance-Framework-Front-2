import { z } from "zod";

export const DeclarationFormSchema = z.object({
  revenue: z.number().min(0),
  expense: z.number().min(0),
});
