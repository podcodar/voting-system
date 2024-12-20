import { ElectionStatus } from "@prisma/client";
import { z } from "zod";

export const createElectionValidator = z.object({
  name: z
    .string()
    .min(5, { message: "O nome de usuário deve ter no mínimo 5 caracteres" })
    .max(20, { message: "O nome de usuário deve ter no máximo 20 caracteres" }),
  status: z.nativeEnum(ElectionStatus),
});

export const electionSchema = z.object({
  name: createElectionValidator.shape.name,
  candidates: z.array(z.string().uuid({ message: "ID de candidato inválido" })),
});

export const updateElectionSchema = z
  .string()
  .uuid({ message: "ID de eleição inválido" });

export type FindElection = z.infer<typeof createElectionValidator>;
