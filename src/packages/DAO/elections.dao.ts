"use server";

import prisma from "@lib/prisma";
import { createElectionValidator } from "@packages/dto/elections.dto";
import type { CreateElection } from "@packages/entities/elections";
import { ElectionStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getElectionsOptions() {
  const elections = await getElections();

  return elections.map((election) => ({
    name: election.name,
    value: election.id,
  }));
}

export async function createElection(formData: CreateElection) {
  const electionSchema = z.object({
    name: z.string(),
    candidates: z.array(z.string().uuid()),
  });
  const parsedFormData = electionSchema.parse(formData);

  return await prisma.election.create({
    data: {
      name: parsedFormData.name,
      candidates: {
        connect: parsedFormData.candidates.map((candidate) => ({
          id: candidate,
        })),
      },
    },
  });
}

export async function startElection(formData: FormData) {
  const electionId = String(formData.get("electionId"));
  const updateElectionSchema = z.string().uuid();
  const parsedElectionId = updateElectionSchema.parse(electionId);

  await prisma.election.update({
    where: { id: parsedElectionId },
    data: {
      name: "Updated on server",
      status: ElectionStatus.ONGOING,
    },
  });

  revalidatePath("/");
}

export async function addElection(formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsedData = createElectionValidator.parse(data);
  await prisma.election.create({
    data: parsedData,
  });

  revalidatePath("/");
}
async function getElections() {
  return await prisma.election.findMany();
}

// async function updateElection() {
//   return await prisma.election.findMany();
// }
