import { ElectionStatus } from "@prisma/client";
import { z } from "zod";

export const createElectionValidator = z.object({
  name: z.string().refine((val) => val.length > 3 && val.length <= 20),
  status: z.nativeEnum(ElectionStatus),
});
