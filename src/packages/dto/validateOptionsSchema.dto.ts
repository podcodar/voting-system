import { z } from "zod";

export const validateOptionsSchema = z.object({
  name: z.string().min(1, { message: "" }).max(20, ""),
  value: z.string().min(1, { message: "" }).max(20, ""),
});
