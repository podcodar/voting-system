import { z } from "zod";

export const validateOptionsSchema = z.object({
  name: z.string().min(1, { message: "" }),
  value: z.string().min(1, { message: "" }),
});
