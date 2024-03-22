import { ElectionStatus } from "@prisma/client";
import { z } from "zod";

export const createElectionValidator = z.object({
  name: z.string().min(1),
  status: z.nativeEnum(ElectionStatus),
});
